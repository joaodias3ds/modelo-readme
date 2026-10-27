/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ProjectConfig } from './types';
import { PRESET_PROFILES } from './data/presets';
import { generateMarkdown, generateAIPrompt } from './utils/markdownGenerator';
import { TopBar } from './components/TopBar';
import { ConfigSidebar } from './components/ConfigSidebar';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { RawMarkdownView } from './components/RawMarkdownView';
import { AIPromptModal } from './components/AIPromptModal';
import { SnippetDrawer } from './components/SnippetDrawer';
import { 
  Eye, 
  Code, 
  Sparkles, 
  Sun, 
  Moon, 
  Download, 
  Copy, 
  Check, 
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<ProjectConfig>(PRESET_PROFILES[0].config);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'preview' | 'raw' | 'ai-prompt'>('preview');
  const [isAIPromptOpen, setIsAIPromptOpen] = useState(false);
  const [isSnippetDrawerOpen, setIsSnippetDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const markdownContent = useMemo(() => generateMarkdown(config), [config]);
  const aiPromptContent = useMemo(() => generateAIPrompt(config), [config]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    showToast('README.md copiado com sucesso para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Download do README.md iniciado!');
  };

  const handleDownloadAIPrompt = () => {
    const blob = new Blob([aiPromptContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_README_PROMPT.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Download do prompt para IA iniciado!');
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_PROFILES.find(p => p.id === presetId);
    if (preset) {
      setConfig(preset.config);
      showToast(`Preset "${preset.name}" carregado com sucesso!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 border border-blue-500/40 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar strictly following contract */}
      <TopBar
        onCopy={handleCopyMarkdown}
        onDownload={handleDownloadMarkdown}
        onOpenAIPrompt={() => setIsAIPromptOpen(true)}
        onOpenSnippets={() => setIsSnippetDrawerOpen(true)}
        copied={copied}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Config Sidebar */}
        <ConfigSidebar
          config={config}
          onChange={setConfig}
          onApplyPreset={handleApplyPreset}
        />

        {/* Right Preview & Workspace Area */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Workspace Sub-Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-2.5 border-b border-slate-800 bg-slate-900/60 shrink-0">
            {/* View Mode Segmented Switcher */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-800/80 rounded-md border border-slate-700/60">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Prévia Visual (GitHub)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('raw')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'raw'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Código Markdown Bruto
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ai-prompt')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'ai-prompt'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Prompt Mestre para IA
              </button>
            </div>

            {/* Controles de Tema e Ações Rápidas */}
            <div className="flex items-center gap-3">
              {/* Indicador de Linguagens */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Stack Poliglota:</span>
                <span className="text-slate-400">
                  {config.primaryLanguages.map(l => l.toUpperCase()).join(' · ')}
                </span>
              </div>

              {/* Alternador de Tema GitHub */}
              {activeTab === 'preview' && (
                <button
                  type="button"
                  onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Alternar tema de visualização (GitHub Dark / GitHub Light)"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tema Claro</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Tema Escuro</span>
                    </>
                  )}
                </button>
              )}

              {/* Botão de Snippets */}
              <button
                type="button"
                onClick={() => setIsSnippetDrawerOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Snippets</span>
              </button>
            </div>
          </div>

          {/* Active View Content Viewport */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {activeTab === 'preview' && (
              <div className="max-w-4xl mx-auto">
                <MarkdownRenderer markdown={markdownContent} theme={theme} />
              </div>
            )}

            {activeTab === 'raw' && (
              <div className="max-w-5xl mx-auto">
                <RawMarkdownView
                  markdown={markdownContent}
                  onCopy={handleCopyMarkdown}
                  copied={copied}
                />
              </div>
            )}

            {activeTab === 'ai-prompt' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="p-4 rounded-lg bg-indigo-950/40 border border-indigo-800/40 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      Blueprint de Instruções de Sistema para IA
                    </h3>
                    <p className="text-xs text-indigo-200/80 mt-1">
                      Envie este prompt como system instruction ou mensagem inicial no Gemini, Claude ou Cursor para ele gerar READMEs padronizados para qualquer projeto.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiPromptContent);
                        showToast('Prompt mestre copiado!');
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt</span>
                    </button>
                    <button
                      onClick={handleDownloadAIPrompt}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-700"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar .md</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-[#0d1117] p-5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all shadow-inner">
                  {aiPromptContent}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals & Drawers */}
      <AIPromptModal
        isOpen={isAIPromptOpen}
        onClose={() => setIsAIPromptOpen(false)}
        config={config}
      />

      <SnippetDrawer
        isOpen={isSnippetDrawerOpen}
        onClose={() => setIsSnippetDrawerOpen(false)}
      />
    </div>
  );
}
