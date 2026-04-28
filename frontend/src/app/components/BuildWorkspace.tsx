import { lazy, Suspense, useMemo, useState } from 'react';
import { ArrowLeft, Code2, Eye, FileCode2, FileJson2, FileText, Maximize2, Minimize2, Plus, RefreshCcw } from 'lucide-react';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

type BuildTab = 'html' | 'css' | 'javascript' | 'preview';

const starterHtml = `<main class="hero">
  <p class="eyebrow">Code Quest Build</p>
  <h1>Hello, world!</h1>
  <p>Write HTML, CSS, and JavaScript. Your preview updates live.</p>
  <button id="action">Click me</button>
</main>`;

const starterCss = `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: Inter, system-ui, sans-serif;
  color: #f1f3fc;
  background: #0a0e14;
}

.hero {
  width: min(420px, calc(100vw - 32px));
  padding: 28px;
  border: 1px solid rgba(92, 253, 128, 0.28);
  border-radius: 14px;
  background: linear-gradient(145deg, #151a21, #101722);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.eyebrow {
  color: #5cfd80;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  margin: 10px 0;
  font-size: 38px;
}

button {
  margin-top: 14px;
  border: 0;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 800;
  color: #003314;
  background: #5cfd80;
}`;

const starterJs = `const button = document.querySelector('#action');

button.addEventListener('click', () => {
  button.textContent = 'Built with JavaScript!';
});`;

const editorLanguageByTab: Record<Exclude<BuildTab, 'preview'>, string> = {
  html: 'html',
  css: 'css',
  javascript: 'javascript'
};

const tabMeta: Record<BuildTab, { label: string; filename: string; Icon: typeof FileText }> = {
  html: { label: 'HTML', filename: 'index.html', Icon: FileCode2 },
  css: { label: 'CSS', filename: 'style.css', Icon: FileText },
  javascript: { label: 'JavaScript', filename: 'script.js', Icon: FileJson2 },
  preview: { label: 'Preview', filename: 'live preview', Icon: Eye }
};

interface BuildWorkspaceProps {
  onBack: () => void;
}

export function BuildWorkspace({ onBack }: BuildWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<BuildTab>('html');
  const [html, setHtml] = useState(starterHtml);
  const [css, setCss] = useState(starterCss);
  const [javascript, setJavascript] = useState(starterJs);
  const [previewKey, setPreviewKey] = useState(0);
  const [previewExpanded, setPreviewExpanded] = useState(false);

  const previewDocument = useMemo(
    () => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>${javascript}<\/script>
  </body>
</html>`,
    [css, html, javascript]
  );

  const activeCode =
    activeTab === 'html' ? html : activeTab === 'css' ? css : activeTab === 'javascript' ? javascript : '';
  const setActiveCode =
    activeTab === 'html' ? setHtml : activeTab === 'css' ? setCss : activeTab === 'javascript' ? setJavascript : undefined;

  const resetProject = () => {
    setHtml(starterHtml);
    setCss(starterCss);
    setJavascript(starterJs);
    setPreviewKey((value) => value + 1);
    setActiveTab('html');
  };

  const createNewProject = () => {
    setHtml('');
    setCss('');
    setJavascript('');
    setPreviewKey((value) => value + 1);
    setPreviewExpanded(false);
    setActiveTab('html');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0e14] text-[#f1f3fc]">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#94aaff]/14 bg-[#151a21] px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#94aaff]/18 bg-[#101722] text-[#cfd7ee] transition-colors hover:border-[#94aaff]/45 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5cfd80]/12 text-[#5cfd80]">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-sm font-black uppercase tracking-[0.2em] text-[#f1f3fc]">Build</h2>
            <p className="text-xs text-[#a8abb3]">Untitled Project</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={createNewProject}
            className="flex items-center gap-2 rounded-xl border border-[#5cfd80]/24 bg-[#5cfd80]/10 px-3 py-2 text-xs font-bold text-[#b9ffcb] transition-colors hover:border-[#5cfd80]/45 hover:bg-[#5cfd80]/16"
          >
            <Plus className="h-4 w-4" />
            Create New
          </button>
          <button
            type="button"
            onClick={resetProject}
            className="flex items-center gap-2 rounded-xl border border-[#94aaff]/20 bg-[#94aaff]/10 px-3 py-2 text-xs font-bold text-[#d8e0ff] transition-colors hover:border-[#94aaff]/40 hover:bg-[#94aaff]/16"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className={`grid min-h-0 flex-1 ${previewExpanded ? 'grid-cols-1' : 'grid-cols-[14rem_minmax(0,0.95fr)_minmax(28rem,1.05fr)]'}`}>
        {!previewExpanded && (
        <aside className="border-r border-[#94aaff]/12 bg-[#111827] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#a8abb3]">Files</span>
          </div>
          <div className="space-y-2">
            {(['html', 'css', 'javascript'] as const).map((tab) => {
              const { Icon, filename } = tabMeta[tab];
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-[#94aaff]/18 text-[#f1f3fc]'
                      : 'text-[#a8abb3] hover:bg-[#20262f] hover:text-[#f1f3fc]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-[#5cfd80]' : 'text-[#94aaff]'}`} />
                  {filename}
                </button>
              );
            })}
          </div>
        </aside>
        )}

        {!previewExpanded && (
        <section className="min-w-0 border-r border-[#94aaff]/12 bg-[#0b1020]">
          <div className="flex h-14 items-end border-b border-[#94aaff]/14 bg-[#151a21] px-4">
            {(['html', 'css', 'javascript'] as const).map((tab) => {
              const { Icon, label, filename } = tabMeta[tab];
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  title={filename}
                  className={`flex h-9 items-center gap-1.5 rounded-t-lg border-t border-l border-r px-2.5 text-[11px] font-bold transition-colors ${
                    active
                      ? 'border-[#94aaff]/24 bg-[#0b1020] text-[#f1f3fc]'
                      : 'border-transparent text-[#a8abb3] hover:text-[#f1f3fc]'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${active ? 'text-[#5cfd80]' : ''}`} />
                  {label}
                </button>
              );
            })}
          </div>

          <Suspense fallback={<div className="p-6 text-sm text-[#a8abb3]">Loading editor...</div>}>
            <MonacoEditor
              height="calc(100% - 3.5rem)"
              theme="vs-dark"
              language={editorLanguageByTab[activeTab === 'preview' ? 'html' : activeTab]}
              value={activeCode}
              onChange={(value) => setActiveCode?.(value ?? '')}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                lineHeight: 24,
                fontFamily: 'JetBrains Mono, Fira Code, Menlo, Monaco, Consolas, monospace',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 20, bottom: 20 }
              }}
            />
          </Suspense>
        </section>
        )}

        <section className="min-w-0 bg-[#101722]">
          <div className="flex h-14 items-center justify-between border-b border-[#94aaff]/14 bg-[#151a21] px-4">
            <div className="flex items-center gap-2 rounded-full bg-[#0b1020] px-3 py-1.5 text-xs text-[#a8abb3]">
              <Eye className="h-4 w-4 text-[#5cfd80]" />
              Live Preview
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewExpanded((value) => !value)}
                className="flex items-center gap-2 rounded-lg border border-[#5cfd80]/24 bg-[#5cfd80]/10 px-3 py-1.5 text-xs font-bold text-[#b9ffcb] hover:border-[#5cfd80]/45"
              >
                {previewExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                {previewExpanded ? 'Minimize' : 'Maximize'}
              </button>
              <button
                type="button"
                onClick={() => setPreviewKey((value) => value + 1)}
                className="rounded-lg border border-[#94aaff]/20 bg-[#94aaff]/10 px-3 py-1.5 text-xs font-bold text-[#d8e0ff] hover:border-[#94aaff]/40"
              >
                Refresh
              </button>
            </div>
          </div>
          <iframe
            key={`side-preview-${previewKey}`}
            title="Live build preview"
            sandbox="allow-scripts"
            srcDoc={previewDocument}
            className="h-[calc(100%-3.5rem)] w-full bg-white"
          />
        </section>
      </div>
    </div>
  );
}
