import React, { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  markdown: string;
  theme: 'dark' | 'light';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, theme }) => {
  // Pre-process markdown to handle GitHub Alert callouts (> [!NOTE], > [!WARNING], > [!TIP])
  const htmlContent = useMemo(() => {
    let processed = markdown;

    // Transform GitHub alerts before markdown parsing
    processed = processed.replace(
      />\s*\[!NOTE\]\s*\n([\s\S]*?)(?=(\n\n|\n#[^#]|$))/g,
      '<div class="gh-alert gh-alert-note"><div class="gh-alert-title"><svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg> Note</div><div class="gh-alert-body">$1</div></div>\n'
    );

    processed = processed.replace(
      />\s*\[!WARNING\]\s*\n([\s\S]*?)(?=(\n\n|\n#[^#]|$))/g,
      '<div class="gh-alert gh-alert-warning"><div class="gh-alert-title"><svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg> Warning</div><div class="gh-alert-body">$1</div></div>\n'
    );

    processed = processed.replace(
      />\s*\[!TIP\]\s*\n([\s\S]*?)(?=(\n\n|\n#[^#]|$))/g,
      '<div class="gh-alert gh-alert-tip"><div class="gh-alert-title"><svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.918.29.52.417 1.05.441 1.65H9.688c.024-.6.15-1.13.44-1.65.204-.362.45-.654.674-.918l.214-.253c.56-.679.984-1.32.984-2.304 0-2.06-1.637-3.75-4-3.75ZM6 11.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"/></svg> Tip</div><div class="gh-alert-body">$1</div></div>\n'
    );

    // Transform ```mermaid into visual representation
    processed = processed.replace(
      /```mermaid([\s\S]*?)```/g,
      '<div class="mermaid-diagram-card"><div class="mermaid-badge"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Mermaid Architecture Flow</div><pre class="mermaid-code"><code>$1</code></pre></div>'
    );

    // Configure marked options
    return marked.parse(processed, {
      gfm: true,
      breaks: false,
    });
  }, [markdown]);

  return (
    <div
      className={`gh-markdown-container rounded-lg p-6 sm:p-10 transition-colors ${
        theme === 'dark'
          ? 'bg-[#0d1117] text-[#e6edf3] border border-[#30363d]'
          : 'bg-[#ffffff] text-[#1f2328] border border-[#d0d7de] shadow-sm'
      }`}
    >
      <style>{`
        .gh-markdown-container h1, 
        .gh-markdown-container h2, 
        .gh-markdown-container h3, 
        .gh-markdown-container h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          color: ${theme === 'dark' ? '#f0f6fc' : '#1f2328'};
          margin-top: 1.75rem;
          margin-bottom: 0.85rem;
          line-height: 1.25;
          text-wrap: balance;
        }
        .gh-markdown-container h1 {
          font-size: 2rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === 'dark' ? '#21262d' : '#d8dee4'};
        }
        .gh-markdown-container h2 {
          font-size: 1.5rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid ${theme === 'dark' ? '#21262d' : '#d8dee4'};
          margin-top: 2rem;
        }
        .gh-markdown-container h3 {
          font-size: 1.2rem;
        }
        .gh-markdown-container h4 {
          font-size: 1rem;
        }
        .gh-markdown-container p {
          margin-bottom: 1rem;
          line-height: 1.65;
          font-size: 0.95rem;
        }
        .gh-markdown-container a {
          color: ${theme === 'dark' ? '#58a6ff' : '#0969da'};
          text-decoration: none;
        }
        .gh-markdown-container a:hover {
          text-decoration: underline;
        }
        .gh-markdown-container hr {
          height: 1px;
          border: none;
          background: ${theme === 'dark' ? '#30363d' : '#d0d7de'};
          margin: 2rem 0;
        }
        .gh-markdown-container ul {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .gh-markdown-container ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .gh-markdown-container li {
          margin-bottom: 0.35rem;
        }
        .gh-markdown-container li input[type="checkbox"] {
          margin-right: 0.5rem;
        }
        .gh-markdown-container table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          font-size: 0.88rem;
          font-variant-numeric: tabular-nums;
          overflow-x: auto;
          display: block;
        }
        .gh-markdown-container th {
          background-color: ${theme === 'dark' ? '#161b22' : '#f6f8fa'};
          color: ${theme === 'dark' ? '#f0f6fc' : '#1f2328'};
          font-weight: 600;
          padding: 8px 14px;
          border: 1px solid ${theme === 'dark' ? '#30363d' : '#d0d7de'};
          text-align: left;
        }
        .gh-markdown-container td {
          padding: 8px 14px;
          border: 1px solid ${theme === 'dark' ? '#30363d' : '#d0d7de'};
        }
        .gh-markdown-container tr:nth-child(2n) {
          background-color: ${theme === 'dark' ? '#161b2255' : '#f6f8fa88'};
        }
        .gh-markdown-container code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          background-color: ${theme === 'dark' ? '#161b22' : '#eff2f5'};
          color: ${theme === 'dark' ? '#e6edf3' : '#24292f'};
        }
        .gh-markdown-container pre {
          background-color: ${theme === 'dark' ? '#161b22' : '#f6f8fa'};
          border: 1px solid ${theme === 'dark' ? '#30363d' : '#d0d7de'};
          border-radius: 6px;
          padding: 14px 16px;
          overflow-x: auto;
          margin: 1rem 0;
          line-height: 1.45;
        }
        .gh-markdown-container pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
          color: ${theme === 'dark' ? '#e6edf3' : '#1f2328'};
          font-size: 0.85rem;
        }
        .gh-markdown-container blockquote {
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          color: ${theme === 'dark' ? '#8b949e' : '#57606a'};
          border-left: 0.25rem solid ${theme === 'dark' ? '#3b434b' : '#d0d7de'};
        }
        .gh-markdown-container details {
          border: 1px solid ${theme === 'dark' ? '#30363d' : '#d0d7de'};
          border-radius: 6px;
          padding: 0.75rem 1rem;
          margin-bottom: 0.75rem;
          background: ${theme === 'dark' ? '#161b2244' : '#fafbfc'};
        }
        .gh-markdown-container summary {
          cursor: pointer;
          font-weight: 600;
          color: ${theme === 'dark' ? '#f0f6fc' : '#1f2328'};
          user-select: none;
        }
        .gh-markdown-container summary:hover {
          color: ${theme === 'dark' ? '#58a6ff' : '#0969da'};
        }
        .gh-alert {
          border-left: 4px solid;
          padding: 10px 14px;
          border-radius: 6px;
          margin: 1rem 0;
          font-size: 0.9rem;
        }
        .gh-alert-note {
          border-color: #2f81f7;
          background-color: ${theme === 'dark' ? 'rgba(56, 139, 253, 0.1)' : 'rgba(56, 139, 253, 0.08)'};
        }
        .gh-alert-note .gh-alert-title {
          color: #2f81f7;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .gh-alert-warning {
          border-color: #d29922;
          background-color: ${theme === 'dark' ? 'rgba(210, 153, 34, 0.1)' : 'rgba(210, 153, 34, 0.08)'};
        }
        .gh-alert-warning .gh-alert-title {
          color: #d29922;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .gh-alert-tip {
          border-color: #3fb950;
          background-color: ${theme === 'dark' ? 'rgba(63, 185, 80, 0.1)' : 'rgba(63, 185, 80, 0.08)'};
        }
        .gh-alert-tip .gh-alert-title {
          color: #3fb950;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .mermaid-diagram-card {
          border: 1px solid ${theme === 'dark' ? '#30363d' : '#d0d7de'};
          border-radius: 6px;
          background: ${theme === 'dark' ? '#161b22' : '#f6f8fa'};
          padding: 1rem;
          margin: 1rem 0;
        }
        .mermaid-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: ${theme === 'dark' ? '#8b949e' : '#57606a'};
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};
