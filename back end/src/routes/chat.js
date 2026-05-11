import express from 'express';
import { OpenRouter } from '@openrouter/sdk';
import { ChatSession } from '../../database/ChatSession.js';

const router = express.Router();
const defaultOpenRouterModel = 'meta-llama/llama-3.3-70b-instruct:free';

function getProviderConfig() {
  return {
    apiKey: process.env.OPENROUTER_API_KEY || process.env.AI_API_KEY,
    model: process.env.OPENROUTER_MODEL || defaultOpenRouterModel,
    httpReferer: process.env.OPENROUTER_SITE_URL || 'http://localhost:5173',
    appTitle: process.env.OPENROUTER_APP_NAME || 'Code Quest'
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

async function getOpenRouterReply(providerConfig, systemPrompt, userPrompt) {
  const openrouter = new OpenRouter({
    apiKey: providerConfig.apiKey,
    httpReferer: providerConfig.httpReferer,
    appTitle: providerConfig.appTitle
  });

  const stream = await openrouter.chat.send({
    chatRequest: {
      model: providerConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      stream: true
    }
  });

  let reply = '';
  for await (const chunk of stream) {
    const content = chunk.choices?.[0]?.delta?.content;
    if (content) {
      reply += content;
    }
  }

  return reply.trim() || 'No reply returned.';
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
      error: 'Missing OPENROUTER_API_KEY on the backend server'
    });
  }

  try {
    const session = await getOrCreateSession(req.user.id, normalizeThreadKey(threadKey));
    const recentMessages = session.messages.slice(-8);
    const historyText = recentMessages
      .map((entry) => `${entry.role === 'user' ? 'Student' : 'Assistant'}: ${entry.text}`)
      .join('\n');

    const systemPrompt = [
      'You are QUEST AI, the CodeQuest study assistant.',
      'Help students understand lessons clearly and briefly.',
      'Prefer teaching, worked examples, and step-by-step explanations.',
      'Ground your answer in the provided lesson and course context when available.',
      'If helpful, suggest one short next practice step.',
      'If the student asks for code, explain it in a beginner-friendly way.',
      'If the student is confused, ask one short clarifying question before going deeper.',
      'Return plain text only.',
      'Do not use markdown, bold markers, headings, bullets, or code fences.'
    ].join(' ');

    const userPrompt = context
      ? `Learning context:\n${context}\n\nRecent conversation:\n${historyText || 'None'}\n\nStudent question: ${String(message).trim()}`
      : `Recent conversation:\n${historyText || 'None'}\n\nStudent question: ${String(message).trim()}`;

    const reply = await getOpenRouterReply(providerConfig, systemPrompt, userPrompt);

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
      error: error instanceof Error ? error.message : 'Failed to contact AI provider'
    });
  }
});

export default router;
