import express from 'express';
import { ChatSession } from '../../database/ChatSession.js';

const router = express.Router();

function getProviderConfig() {
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();

  if (provider === 'deepseek') {
    return {
      provider,
      apiKey: process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY,
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      baseUrl: 'https://api.deepseek.com/chat/completions'
    };
  }

  if (provider === 'openrouter') {
    return {
      provider,
      apiKey: process.env.OPENROUTER_API_KEY || process.env.AI_API_KEY,
      model: process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat-v3-0324:free',
      baseUrl: 'https://openrouter.ai/api/v1/chat/completions'
    };
  }

  return {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY || process.env.AI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
    baseUrl: 'https://api.openai.com/v1/responses'
  };
}

function normalizeThreadKey(value) {
  if (!value || typeof value !== 'string') {
    return 'global';
  }
  return value.trim() || 'global';
}

async function getOrCreateSession(userId, threadKey) {
  let session = await ChatSession.findOne({ userId, threadKey });
  if (!session) {
    session = await ChatSession.create({ userId, threadKey, messages: [] });
  }
  return session;
}

router.get('/history', async (req, res) => {
  try {
    const session = await getOrCreateSession(req.user.id, normalizeThreadKey(req.query.threadKey));
    return res.json({ messages: session.messages });
  } catch (error) {
    return res.status(500).json({ error: 'failed to load chat history' });
  }
});

router.delete('/history', async (req, res) => {
  try {
    const session = await getOrCreateSession(req.user.id, normalizeThreadKey(req.query.threadKey));
    session.messages = [];
    await session.save();
    return res.json({ message: 'chat history cleared' });
  } catch (error) {
    return res.status(500).json({ error: 'failed to clear chat history' });
  }
});

router.post('/', async (req, res) => {
  const { message, context, threadKey } = req.body;

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const providerConfig = getProviderConfig();
  if (!providerConfig.apiKey) {
    return res.status(500).json({
      error: providerConfig.provider === 'deepseek'
        ? 'Missing DEEPSEEK_API_KEY on the backend server'
        : providerConfig.provider === 'openrouter'
        ? 'Missing OPENROUTER_API_KEY on the backend server'
        : 'Missing OPENAI_API_KEY on the backend server'
    });
  }

  try {
    const session = await getOrCreateSession(req.user.id, normalizeThreadKey(threadKey));
    const recentMessages = session.messages.slice(-8);
    const historyText = recentMessages
      .map((entry) => `${entry.role === 'user' ? 'Student' : 'Assistant'}: ${entry.text}`)
      .join('\n');

    const systemPrompt = [
      'You are Code Quest Study Assistant.',
      'Help students understand lessons clearly and briefly.',
      'Prefer teaching, worked examples, and step-by-step explanations.',
      'Ground your answer in the provided lesson and course context when available.',
      'If helpful, suggest one short next practice step.',
      'If the student asks for code, explain it in a beginner-friendly way.',
      'If the student is confused, ask one short clarifying question before going deeper.'
    ].join(' ');

    const userPrompt = context
      ? `Learning context:\n${context}\n\nRecent conversation:\n${historyText || 'None'}\n\nStudent question: ${String(message).trim()}`
      : `Recent conversation:\n${historyText || 'None'}\n\nStudent question: ${String(message).trim()}`;

    const response = providerConfig.provider === 'deepseek' || providerConfig.provider === 'openrouter'
      ? await fetch(providerConfig.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${providerConfig.apiKey}`,
            ...(providerConfig.provider === 'openrouter'
              ? {
                  'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:5173',
                  'X-Title': process.env.OPENROUTER_APP_NAME || 'Code Quest'
                }
              : {})
          },
          body: JSON.stringify({
            model: providerConfig.model,
            temperature: 0.7,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ]
          })
        })
      : await fetch('https://api.openai.com/v1/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${providerConfig.apiKey}`
          },
          body: JSON.stringify({
            model: providerConfig.model,
            instructions: systemPrompt,
            input: [
              {
                role: 'user',
                content: [
                  {
                    type: 'input_text',
                    text: userPrompt
                  }
                ]
              }
            ]
          })
        });

    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: payload?.error?.message || 'OpenAI request failed'
      });
    }

    const reply = providerConfig.provider === 'deepseek' || providerConfig.provider === 'openrouter'
      ? payload?.choices?.[0]?.message?.content || 'No reply returned.'
      : payload.output_text || 'No reply returned.';

    session.messages.push(
      { role: 'user', text: String(message).trim() },
      { role: 'assistant', text: reply }
    );
    session.messages = session.messages.slice(-20);
    await session.save();

    return res.json({
      reply,
      messages: session.messages
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to contact OpenAI'
    });
  }
});

export default router;
