import React from 'react';
import { Download, Copy, Sparkles, FileText, Check } from 'lucide-react';

interface TopBarProps {
  onCopy: () => void;
  onDownload: () => void;
  onOpenAIPrompt: () => void;
  onOpenSnippets: () => void;
  copied: boolean;
  activeTab: 'preview' | 'raw' | 'ai-prompt';
  setActiveTab: (tab: 'preview' | 'raw' | 'ai-prompt') => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onCopy,
  onDownload,
  onOpenAIPrompt,
  onOpenSnippets,
  copied,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950 text-slate-100 shrink-0 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <a href="/" className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xs font-black text-white">
            DF
          </span>
          DocuForge
        </a>
        <span className="text-xs text-slate-400 hidden sm:inline">
          · README Studio & AI Prompt Engine
        </span>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('preview')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'preview' ? 'text-blue-400 font-semibold' : ''}`}
        >
          Visual Preview
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'raw' ? 'text-blue-400 font-semibold' : ''}`}
        >
          Raw Markdown
        </button>
        <button
          onClick={onOpenAIPrompt}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-indigo-300 hover:text-indigo-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI System Prompt
        </button>
        <button
          onClick={onOpenSnippets}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-slate-300"
        >
          <FileText className="w-3.5 h-3.5" />
          Snippet Library
        </button>
      </nav>

      {/* Zone 3: 1 primary action cluster */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md transition-colors cursor-pointer border border-slate-700"
          title="Copiar Markdown para Área de Transferência"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar .md'}</span>
        </button>

        <button
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors cursor-pointer shadow-sm"
          title="Baixar arquivo README.md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Baixar README.md</span>
        </button>
      </div>
    </header>
  );
};
