import React, { useState } from 'react';
import { ProjectConfig, SupportedLanguage, LicenseType, ScreenshotItem } from '../types';
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
  BarChart3, 
  User, 
  Palette,
  Image,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles
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
    screenshots: true,
    languages: false,
    githubStats: false,
    modules: false,
    badges: false,
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
        if (prev.primaryLanguages.length === 1) return prev; // Mantém pelo menos uma
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

  const handleStatsChange = (field: keyof ProjectConfig['githubStats'], value: any) => {
    onChange(prev => ({
      ...prev,
      githubStats: {
        ...prev.githubStats,
        [field]: value,
      },
    }));
  };

  // Funções de gerenciamento de Screenshots / Imagens
  const handleAddScreenshot = () => {
    const newShot: ScreenshotItem = {
      id: `shot-${Date.now()}`,
      title: 'Nova Captura de Tela',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'Descrição demonstrando o fluxo operacional da funcionalidade.',
      type: 'desktop',
    };

    onChange(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        screenshots: true,
      },
      screenshots: [...(prev.screenshots || []), newShot],
    }));
  };

  const handleUpdateScreenshot = (id: string, field: keyof ScreenshotItem, value: any) => {
    onChange(prev => ({
      ...prev,
      screenshots: (prev.screenshots || []).map(shot => 
        shot.id === id ? { ...shot, [field]: value } : shot
      ),
    }));
  };

  const handleDeleteScreenshot = (id: string) => {
    onChange(prev => ({
      ...prev,
      screenshots: (prev.screenshots || []).filter(shot => shot.id !== id),
    }));
  };

  const handleRestoreDefaultScreenshots = () => {
    onChange(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        screenshots: true,
      },
      screenshots: [
        {
          id: 'shot-1',
          title: 'Painel Principal & Métricas',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          description: 'Visão geral do sistema com métricas de desempenho e telemetria.',
          type: 'desktop',
        },
        {
          id: 'shot-2',
          title: 'Visualização Mobile Adaptada',
          url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
          description: 'Interface 100% responsiva para acompanhamento em dispositivos móveis.',
          type: 'mobile',
        },
        {
          id: 'shot-3',
          title: 'Terminal CLI & Logs',
          url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
          description: 'Execução de comandos e rastreamento distribuído via terminal.',
          type: 'terminal',
        },
      ],
    }));
  };

  return (
    <aside className="w-80 md:w-96 flex flex-col border-r border-slate-800 bg-slate-900/90 text-slate-200 shrink-0 h-[calc(100vh-57px)] overflow-y-auto">
      {/* Barra de Perfis / Presets */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Modelos Prontos (Presets)
          </label>
          <span className="text-[11px] text-slate-500">Configuração Rápida</span>
        </div>
        <select
          aria-label="Modelos Prontos"
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
        {/* Acordeão 1: Identidade do Projeto */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('identity')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              Identidade do Projeto & Repo
            </span>
            {openSections.identity ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.identity && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nome do Projeto</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => handleTextChange('name', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ex: OmniCore Engine"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Slogan / Tagline (1 frase de impacto)</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => handleTextChange('tagline', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Motor de orquestração de alto desempenho..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Usuário / Organização</label>
                  <input
                    type="text"
                    value={config.githubUser}
                    onChange={(e) => handleTextChange('githubUser', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder="empresa-dev"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nome do Repositório</label>
                  <input
                    type="text"
                    value={config.githubRepo}
                    onChange={(e) => handleTextChange('githubRepo', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder="omnicore"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Licença de Código Aberto</label>
                <select
                  aria-label="Licença"
                  value={config.license}
                  onChange={(e) => handleTextChange('license', e.target.value as LicenseType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="MIT">Licença MIT (Permissiva, mais popular)</option>
                  <option value="Apache-2.0">Apache 2.0 (Garantia de patentes, corporativa)</option>
                  <option value="GPL-3.0">GNU GPL v3 (Copyleft estrito)</option>
                  <option value="BSD-3-Clause">BSD 3-Clause</option>
                  <option value="Unlicense">The Unlicense (Domínio público)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Acordeão 2: CAPTURAS DE TELA & IMAGENS DO APLICATIVO/SISTEMA */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <div className="flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors">
            <button
              type="button"
              onClick={() => toggleAccordion('screenshots')}
              className="flex items-center gap-2 flex-1 text-left cursor-pointer"
            >
              <Image className="w-4 h-4 text-emerald-400" />
              <span>Capturas de Tela do Sistema ({config.screenshots?.length || 0})</span>
            </button>
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-normal text-slate-400 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sections.screenshots}
                  onChange={() => toggleSection('screenshots')}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-0 cursor-pointer"
                />
                <span className={config.sections.screenshots ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {config.sections.screenshots ? 'Ativo' : 'Inativo'}
                </span>
              </label>
              <button
                type="button"
                onClick={() => toggleAccordion('screenshots')}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {openSections.screenshots ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {openSections.screenshots && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-3 text-xs">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Adicione fotos ou capturas reais da interface gráfica, do painel web, mobile ou do terminal CLI para enriquecer o README.
              </p>

              {/* Layout da Galeria */}
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Estilo de Exibição das Imagens
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleTextChange('screenshotLayout', 'grid')}
                    className={`px-2 py-1.5 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
                      (config.screenshotLayout || 'grid') === 'grid'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Grade Comparativa (2 colunas)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTextChange('screenshotLayout', 'single')}
                    className={`px-2 py-1.5 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
                      config.screenshotLayout === 'single'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Destaque Vertical (Pilha)
                  </button>
                </div>
              </div>

              {/* Lista de Imagens */}
              <div className="space-y-3 pt-2 border-t border-slate-800/60">
                {(config.screenshots || []).map((shot, index) => (
                  <div
                    key={shot.id}
                    className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-300">
                        Foto #{index + 1} ({shot.type.toUpperCase()})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteScreenshot(shot.id)}
                        className="text-slate-500 hover:text-rose-400 p-0.5 rounded cursor-pointer transition-colors"
                        title="Remover esta captura de tela"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={shot.title}
                        onChange={(e) => handleUpdateScreenshot(shot.id, 'title', e.target.value)}
                        placeholder="Título da tela (ex: Dashboard de Vendas)"
                        className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-white text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={shot.url}
                        onChange={(e) => handleUpdateScreenshot(shot.id, 'url', e.target.value)}
                        placeholder="Caminho relativo (ex: ./docs/dashboard.png) ou URL"
                        className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-white text-[11px] font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={shot.description}
                        onChange={(e) => handleUpdateScreenshot(shot.id, 'description', e.target.value)}
                        placeholder="Legenda ou descrição da imagem..."
                        className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-slate-300 text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-[10px]">
                      {(['desktop', 'mobile', 'terminal', 'gif'] as const).map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleUpdateScreenshot(shot.id, 'type', t)}
                          className={`px-1.5 py-0.5 rounded uppercase font-mono cursor-pointer transition-colors ${
                            shot.type === t
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleAddScreenshot}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Imagem</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestoreDefaultScreenshots}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs cursor-pointer border border-slate-700 transition-colors"
                    title="Restaurar capturas de tela padrão"
                  >
                    Exemplos
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Acordeão 3: Linguagens Poliglotas */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('languages')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              Linguagens Suportadas ({config.primaryLanguages.length})
            </span>
            {openSections.languages ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.languages && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-2">
              <p className="text-[11px] text-slate-400 mb-2">
                Ative ou desative linguagens para gerar comandos e blocos de código específicos:
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

        {/* Acordeão 4: GitHub Stats & Cards */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <div className="flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors">
            <button
              type="button"
              onClick={() => toggleAccordion('githubStats')}
              className="flex items-center gap-2 flex-1 text-left cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>Widgets do GitHub ({config.githubStats?.username || config.githubUser})</span>
            </button>
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-normal text-slate-400 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sections.githubStats}
                  onChange={() => toggleSection('githubStats')}
                  className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                />
                <span className={config.sections.githubStats ? 'text-purple-300 font-medium' : 'text-slate-500'}>
                  {config.sections.githubStats ? 'Ativo' : 'Inativo'}
                </span>
              </label>
              <button
                type="button"
                onClick={() => toggleAccordion('githubStats')}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {openSections.githubStats ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {openSections.githubStats && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-purple-400" />
                    Usuário no GitHub
                  </label>
                  {config.githubUser && config.githubStats?.username !== config.githubUser && (
                    <button
                      type="button"
                      onClick={() => handleStatsChange('username', config.githubUser)}
                      className="text-[10px] text-purple-400 hover:text-purple-300 underline cursor-pointer"
                    >
                      Usar dono ({config.githubUser})
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={config.githubStats?.username ?? config.githubUser}
                  onChange={(e) => handleStatsChange('username', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
                  placeholder="Seu usuário no GitHub (ex: octocat)"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                  <Palette className="w-3 h-3 text-purple-400" />
                  Tema dos Cards
                </label>
                <select
                  aria-label="Tema dos Cards"
                  value={config.githubStats?.theme || 'tokyonight'}
                  onChange={(e) => handleStatsChange('theme', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="tokyonight">Tokyo Night (Neon Escuro)</option>
                  <option value="radical">Radical (Rosa / Ciano)</option>
                  <option value="dracula">Dracula (Roxo Clássico)</option>
                  <option value="github_dark">GitHub Dark (Oficial)</option>
                  <option value="nord">Nord (Azul Ártico)</option>
                  <option value="gruvbox">Gruvbox (Retrô)</option>
                  <option value="dark">Dark Minimal</option>
                </select>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block mb-1">
                  Cards Ativos
                </span>

                <label className="flex items-center justify-between py-0.5 hover:bg-slate-800/30 rounded px-1 cursor-pointer">
                  <span className="text-slate-300">Resumo Geral (Estrelas, Commits, PRs)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Padrão</span>
                </label>

                <label className="flex items-center justify-between py-0.5 hover:bg-slate-800/30 rounded px-1 cursor-pointer">
                  <span className="text-slate-300">Streak de Contribuições (Dias seguidos)</span>
                  <input
                    type="checkbox"
                    checked={config.githubStats?.showStreak ?? true}
                    onChange={(e) => handleStatsChange('showStreak', e.target.checked)}
                    className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between py-0.5 hover:bg-slate-800/30 rounded px-1 cursor-pointer">
                  <span className="text-slate-300">Linguagens Mais Utilizadas</span>
                  <input
                    type="checkbox"
                    checked={config.githubStats?.showTopLangs ?? true}
                    onChange={(e) => handleStatsChange('showTopLangs', e.target.checked)}
                    className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between py-0.5 hover:bg-slate-800/30 rounded px-1 cursor-pointer">
                  <span className="text-slate-300">Troféus de Perfil (Profile Trophies)</span>
                  <input
                    type="checkbox"
                    checked={config.githubStats?.showTrophies ?? false}
                    onChange={(e) => handleStatsChange('showTrophies', e.target.checked)}
                    className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Acordeão 5: Seções Modulares do README */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('modules')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Seções do README ({Object.values(config.sections).filter(Boolean).length}/22)
            </span>
            {openSections.modules ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.modules && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-2 text-xs max-h-72 overflow-y-auto">
              <p className="text-[11px] text-slate-400 mb-2">
                Ative ou desative seções modulares:
              </p>
              {[
                { key: 'header', label: '1. Header, Hero & Badges' },
                { key: 'tableOfContents', label: '2. Índice de Conteúdo' },
                { key: 'overview', label: '3. Visão Geral & Problema' },
                { key: 'screenshots', label: '4. Capturas de Tela do Sistema' },
                { key: 'features', label: '5. Funcionalidades Principais' },
                { key: 'architecture', label: '6. Arquitetura (Mermaid)' },
                { key: 'directoryStructure', label: '7. Estrutura de Pastas (ASCII)' },
                { key: 'prerequisites', label: '8. Pré-requisitos do Sistema' },
                { key: 'installation', label: '9. Instalação Poliglota' },
                { key: 'environmentConfig', label: '10. Variáveis (.env)' },
                { key: 'quickStart', label: '11. Início Rápido & Código' },
                { key: 'cliReference', label: '12. Comandos CLI' },
                { key: 'apiReference', label: '13. Endpoints da API' },
                { key: 'testing', label: '14. Testes & Qualidade' },
                { key: 'deployment', label: '15. Deploy Docker & CI/CD' },
                { key: 'benchmarks', label: '16. Desempenho & Benchmarks' },
                { key: 'contributing', label: '17. Guia de Contribuição' },
                { key: 'security', label: '18. Política de Segurança' },
                { key: 'faq', label: '19. Perguntas Frequentes (FAQ)' },
                { key: 'roadmap', label: '20. Roadmap & Marcos' },
                { key: 'githubStats', label: '21. Estatísticas do GitHub' },
                { key: 'license', label: '22. Licença & Agradecimentos' },
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

        {/* Acordeão 6: Badges Shields.io */}
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
          <button
            onClick={() => toggleAccordion('badges')}
            className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Badges Dinâmicos (Shields.io)
            </span>
            {openSections.badges ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSections.badges && (
            <div className="p-3 pt-1 border-t border-slate-800/60 space-y-2 text-xs">
              {[
                { key: 'ci', label: 'Status de Build (GitHub Actions)' },
                { key: 'release', label: 'Última Versão (SemVer)' },
                { key: 'license', label: 'Licença de Software' },
                { key: 'coverage', label: 'Cobertura de Código (Codecov)' },
                { key: 'docker', label: 'Contador de Downloads Docker' },
                { key: 'discord', label: 'Comunidade no Discord' },
                { key: 'npm', label: 'Pacote npm (Node)' },
                { key: 'pypi', label: 'Pacote PyPI (Python)' },
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
