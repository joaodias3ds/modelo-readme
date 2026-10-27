import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { ProjectConfig } from '../types';
import { generateAIPrompt } from '../utils/markdownGenerator';

interface AIPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProjectConfig;
}

export const AIPromptModal: React.FC<AIPromptModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copied, setCopied] = useState(false);
  const aiPromptText = generateAIPrompt(config);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(aiPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Prompt de Sistema para IA (Master README Blueprint)
              </h3>
              <p className="text-xs text-slate-400">
                Alimente qualquer IA (Claude, Gemini, Cursor, ChatGPT) para gerar READMEs completos para qualquer repositório
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="px-6 py-3 bg-indigo-950/30 border-b border-indigo-900/40 text-xs text-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              Este prompt força a IA a seguir todas as 20 seções modulares sem atalhos ou alucinações.
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium cursor-pointer transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copiado para Área de Transferência!' : 'Copiar Prompt'}
          </button>
        </div>

        {/* Prompt Code View */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed whitespace-pre-wrap select-all">
          {aiPromptText}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
          <span>Também salvo como <code>/AI_SYSTEM_PROMPT_README.md</code> no projeto</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
