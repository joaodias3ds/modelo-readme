import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Search } from 'lucide-react';
import { MODULAR_SNIPPETS } from '../data/snippets';
import { SnippetBlock } from '../types';

interface SnippetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SnippetDrawer: React.FC<SnippetDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['Todos', ...Array.from(new Set(MODULAR_SNIPPETS.map(s => s.category)))];

  const filtered = MODULAR_SNIPPETS.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (snippet: SnippetBlock) => {
    navigator.clipboard.writeText(snippet.markdown);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-end">
      <div className="bg-slate-900 border-l border-slate-700 w-full max-w-2xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Biblioteca de Snippets Modulares</h3>
              <p className="text-xs text-slate-400">Blocos pré-fabricados de Markdown prontos para copiar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar snippets (Mermaid, Docker, Commits, CI)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Snippets List */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {filtered.map(snippet => (
            <div
              key={snippet.id}
              className="border border-slate-800 rounded-lg bg-slate-950/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900/50">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    {snippet.title}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
                      {snippet.category}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{snippet.description}</p>
                </div>
                <button
                  onClick={() => handleCopy(snippet)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium cursor-pointer transition-colors border border-slate-700"
                >
                  {copiedId === snippet.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === snippet.id ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-3 text-[11px] font-mono text-slate-300 bg-slate-950 overflow-x-auto max-h-48 leading-relaxed">
                {snippet.markdown}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
