import React from 'react';
import { Copy, Check } from 'lucide-react';

interface RawMarkdownViewProps {
  markdown: string;
  onCopy: () => void;
  copied: boolean;
}

export const RawMarkdownView: React.FC<RawMarkdownViewProps> = ({
  markdown,
  onCopy,
  copied,
}) => {
  const lines = markdown.split('\n');

  return (
    <div className="relative rounded-lg border border-slate-800 bg-[#0d1117] text-slate-300 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/80">
        <span className="text-[11px] text-slate-400 font-sans">
          README.md ({lines.length} lines · {new Blob([markdown]).size} bytes)
        </span>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer border border-slate-700"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar Tudo'}</span>
        </button>
      </div>

      <div className="p-4 overflow-x-auto overflow-y-auto max-h-[calc(100vh-190px)] leading-relaxed select-text flex">
        {/* Line numbers */}
        <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800 shrink-0 font-mono text-[11px] leading-relaxed">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 font-mono text-[11px] text-slate-200 leading-relaxed whitespace-pre font-normal">
          {markdown}
        </pre>
      </div>
    </div>
  );
};
