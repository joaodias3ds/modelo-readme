import React, { useState } from 'react';
import { ProjectConfig, SupportedLanguage, LicenseType } from '../types';
import { PRESET_PROFILES } from '../data/presets';
import { LANGUAGE_REGISTRY } from '../data/languages';
import { 
  Sliders, 
  Layers, 
  Code2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight,
  FolderGit2,
  RefreshCw
} from 'lucide-react';

interface ConfigSidebarProps {
  config: ProjectConfig;
  onChange: (updater: (prev: ProjectConfig) => ProjectConfig) => void;
  onApplyPreset: (presetId: string) => void;
}

export const ConfigSidebar: React.FC<ConfigSidebarProps> = ({
  config,
  onChange,
  onApplyPreset,
}) => {
  const [openSections, setOpenSections] = useState({
    identity: true,
    languages: true,
    modules: true,
    badges: false,
    env: false,
  });

  const toggleAccordion = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTextChange = (field: keyof ProjectConfig, value: any) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (lang: SupportedLanguage) => {
    onChange(prev => {
      const exists = prev.primaryLanguages.includes(lang);
      let updated: SupportedLanguage[];
      if (exists) {
        if (prev.primaryLanguages.length === 1) return prev; // Keep at least one
        updated = prev.primaryLanguages.filter(l => l !== lang);
      } else {
        updated = [...prev.primaryLanguages, lang];
      }
      return { ...prev, primaryLanguages: updated };
    });
  };

  const toggleSection = (sectionKey: keyof ProjectConfig['sections']) => {
    onChange(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections[sectionKey],
      },
    }));
  };

  const toggleBadge = (badgeKey: keyof ProjectConfig['badges']) => {
    onChange(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        [badgeKey]: !prev.badges[badgeKey],
      },
    }));
  };

  return (
    <aside className="w-80 md:w-96 flex flex-col border-r border-slate-800 bg-slate-900/90 text-slate-200 shrink-0 h-[calc(100vh-57px)] overflow-y-auto">
      {/* Preset Profile Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Preset Profiles
          </label>
          <span className="text-[11px] text-slate-500">Quick Config</span>
        </div>
        <select
          aria-label="Preset Profiles"
          onChange={(e) => onApplyPreset(e.target.value)}
          defaultValue="polyglot-master"
          className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded-md px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {PRESET_PROFILES.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 space-y-4">
        {/* Accordion 1: Project Identity */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('identity')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              Project Identity & Repo
            </span>
            {openSections.identity ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.identity && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => handleTextChange('name', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. OmniCore Engine"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Tagline (One-sentence pitch)</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => handleTextChange('tagline', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="High-throughput orchestration engine..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">GitHub Owner</label>
                  <input
                    type="text"
                    value={config.githubUser}
                    onChange={(e) => handleTextChange('githubUser', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder="organization"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Repository Name</label>
                  <input
                    type="text"
                    value={config.githubRepo}
                    onChange={(e) => handleTextChange('githubRepo', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder="project-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">License</label>
                <select
                  aria-label="License"
                  value={config.license}
                  onChange={(e) => handleTextChange('license', e.target.value as LicenseType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="MIT">MIT License (Permissive, standard)</option>
                  <option value="Apache-2.0">Apache 2.0 (Patent grant, enterprise)</option>
                  <option value="GPL-3.0">GNU GPL v3 (Copyleft)</option>
                  <option value="BSD-3-Clause">BSD 3-Clause</option>
                  <option value="Unlicense">The Unlicense (Public domain)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Polyglot Languages */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('languages')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              Active Polyglot Languages ({config.primaryLanguages.length})
            </span>
            {openSections.languages ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.languages && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-2">
              <p className="text-[11px] text-slate-400 mb-2">
                Toggle languages to auto-generate install commands and usage snippets:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(LANGUAGE_REGISTRY) as SupportedLanguage[]).map(langKey => {
                  const lang = LANGUAGE_REGISTRY[langKey];
                  const isActive = config.primaryLanguages.includes(langKey);
                  return (
                    <button
                      key={langKey}
                      type="button"
                      onClick={() => toggleLanguage(langKey)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors cursor-pointer text-left ${
                        isActive
                          ? 'bg-blue-900/40 border-blue-500 text-blue-200'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-medium truncate">{lang.name.split(' ')[0]}</span>
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ml-1 ${
                          isActive ? 'bg-blue-400' : 'bg-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Modular Sections Toggles */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('modules')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              README Sections ({Object.values(config.sections).filter(Boolean).length}/20)
            </span>
            {openSections.modules ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.modules && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-2 text-xs max-h-72 overflow-y-auto">
              <p className="text-[11px] text-slate-400 mb-2">
                Enable or disable modular blocks:
              </p>
              {[
                { key: 'header', label: '1. Header, Hero & Badges' },
                { key: 'tableOfContents', label: '2. Table of Contents' },
                { key: 'overview', label: '3. Overview & Problem Pitch' },
                { key: 'features', label: '4. Key Features Matrix' },
                { key: 'architecture', label: '5. Architecture (Mermaid)' },
                { key: 'directoryStructure', label: '6. Directory Tree (ASCII)' },
                { key: 'prerequisites', label: '7. Prerequisites Matrix' },
                { key: 'installation', label: '8. Polyglot Installation' },
                { key: 'environmentConfig', label: '9. Environment (.env) Table' },
                { key: 'quickStart', label: '10. Quick Start & Code Snippets' },
                { key: 'cliReference', label: '11. CLI Commands Reference' },
                { key: 'apiReference', label: '12. API Reference & Payloads' },
                { key: 'testing', label: '13. Testing & Code Quality' },
                { key: 'deployment', label: '14. Docker & CI/CD Deployment' },
                { key: 'benchmarks', label: '15. Benchmarks & Latency' },
                { key: 'contributing', label: '16. Contributing & Commits' },
                { key: 'security', label: '17. Security Vulnerability Policy' },
                { key: 'faq', label: '18. FAQ & Troubleshooting' },
                { key: 'roadmap', label: '19. Roadmap & Milestones' },
                { key: 'license', label: '20. License & Acknowledgments' },
              ].map(item => (
                <label
                  key={item.key}
                  className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-800/40 cursor-pointer"
                >
                  <span className="text-slate-300 truncate">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={config.sections[item.key as keyof ProjectConfig['sections']]}
                    onChange={() => toggleSection(item.key as keyof ProjectConfig['sections'])}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Accordion 4: Shields.io Badges */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('badges')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Shields.io Badges
            </span>
            {openSections.badges ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.badges && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-2 text-xs">
              {[
                { key: 'ci', label: 'GitHub Actions Build CI' },
                { key: 'release', label: 'Latest Release / SemVer' },
                { key: 'license', label: 'Open-Source License Badge' },
                { key: 'coverage', label: 'Codecov Coverage' },
                { key: 'docker', label: 'Docker Pulls Counter' },
                { key: 'discord', label: 'Discord Community Server' },
                { key: 'npm', label: 'npm Registry Package' },
                { key: 'pypi', label: 'PyPI Python Package' },
              ].map(badge => (
                <label
                  key={badge.key}
                  className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-800/40 cursor-pointer"
                >
                  <span className="text-slate-300">{badge.label}</span>
                  <input
                    type="checkbox"
                    checked={config.badges[badge.key as keyof ProjectConfig['badges']]}
                    onChange={() => toggleBadge(badge.key as keyof ProjectConfig['badges'])}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
