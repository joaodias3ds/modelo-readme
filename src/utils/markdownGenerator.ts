import { ProjectConfig } from '../types';
import { LANGUAGE_REGISTRY } from '../data/languages';

export function generateMarkdown(config: ProjectConfig): string {
  const parts: string[] = [];

  const safeName = config.name || 'Nome do Projeto';
  const safeTagline = config.tagline || 'Uma solução de software moderna, modular e de alto desempenho.';
  const safeUser = config.githubUser || 'usuario';
  const safeRepo = config.githubRepo || 'repositorio';
  const safeLicense = config.license || 'MIT';

  // 1. Header / Hero
  if (config.sections.header) {
    const badges: string[] = [];
    if (config.badges.ci) {
      badges.push(`[![Status do Build](https://img.shields.io/github/actions/workflow/status/${safeUser}/${safeRepo}/ci.yml?branch=main&style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/${safeUser}/${safeRepo}/actions)`);
    }
    if (config.badges.release) {
      badges.push(`[![Última Versão](https://img.shields.io/github/v/release/${safeUser}/${safeRepo}?style=for-the-badge&logo=semver&logoColor=white&color=blue)](https://github.com/${safeUser}/${safeRepo}/releases)`);
    }
    if (config.badges.license) {
      badges.push(`[![Licença: ${safeLicense}](https://img.shields.io/badge/Licen%C3%A7a-${safeLicense}-green.svg?style=for-the-badge)](LICENSE)`);
    }
    if (config.badges.coverage) {
      badges.push(`[![Cobertura de Testes](https://img.shields.io/codecov/c/github/${safeUser}/${safeRepo}?style=for-the-badge&logo=codecov&logoColor=white)](https://codecov.io/gh/${safeUser}/${safeRepo})`);
    }
    if (config.badges.docker && config.primaryLanguages.includes('docker')) {
      badges.push(`[![Downloads Docker](https://img.shields.io/docker/pulls/${safeUser}/${safeRepo}?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/${safeUser}/${safeRepo})`);
    }
    if (config.badges.discord) {
      badges.push(`[![Comunidade no Discord](https://img.shields.io/discord/123456789?style=for-the-badge&logo=discord&logoColor=white&color=5865F2)](https://discord.gg/convite)`);
    }
    if (config.badges.npm && config.primaryLanguages.includes('typescript')) {
      badges.push(`[![Versão npm](https://img.shields.io/npm/v/${safeRepo}?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/${safeRepo})`);
    }
    if (config.badges.pypi && config.primaryLanguages.includes('python')) {
      badges.push(`[![Versão PyPI](https://img.shields.io/pypi/v/${safeRepo}?style=for-the-badge&logo=pypi&logoColor=white&color=3775A9)](https://pypi.org/project/${safeRepo})`);
    }

    parts.push(`<div align="center">

# 🚀 ${safeName}

**${safeTagline}**

${badges.join('\n')}

<p align="center">
  <a href="https://github.com/${safeUser}/${safeRepo}/blob/main/docs/README.md">Documentação</a> ·
  <a href="https://github.com/${safeUser}/${safeRepo}/issues/new?template=bug_report.md">Reportar Erro</a> ·
  <a href="https://github.com/${safeUser}/${safeRepo}/issues/new?template=feature_request.md">Sugerir Recurso</a> ·
  <a href="https://github.com/${safeUser}/${safeRepo}/releases">Lançamentos</a>
</p>

</div>\n\n---`);
  }

  // 2. Tabela de Conteúdos (Índice)
  if (config.sections.tableOfContents) {
    const tocItems: string[] = [];
    if (config.sections.overview) tocItems.push('- [Visão Geral](#-visão-geral)');
    if (config.sections.screenshots && config.screenshots?.length > 0) tocItems.push('- [Capturas de Tela & Demonstração](#-capturas-de-tela--demonstração)');
    if (config.sections.features) tocItems.push('- [Funcionalidades Principais](#-funcionalidades-principais)');
    if (config.sections.architecture) tocItems.push('- [Arquitetura do Sistema](#-arquitetura-do-sistema)');
    if (config.sections.directoryStructure) tocItems.push('- [Estrutura de Diretórios](#-estrutura-de-diretórios)');
    if (config.sections.prerequisites) tocItems.push('- [Pré-requisitos](#-pré-requisitos)');
    if (config.sections.installation) tocItems.push('- [Instalação](#-instalação)');
    if (config.sections.environmentConfig) tocItems.push('- [Variáveis de Ambiente](#-variáveis-de-ambiente)');
    if (config.sections.quickStart) tocItems.push('- [Início Rápido & Exemplos](#-início-rápido--exemplos)');
    if (config.sections.cliReference && config.cliCommands.length > 0) tocItems.push('- [Comandos CLI](#-comandos-cli)');
    if (config.sections.apiReference && config.apiEndpoints.length > 0) tocItems.push('- [Documentação da API](#-documentação-da-api)');
    if (config.sections.testing) tocItems.push('- [Testes & Qualidade](#-testes--qualidade)');
    if (config.sections.deployment) tocItems.push('- [Deploy & CI/CD](#-deploy--cicd)');
    if (config.sections.benchmarks && config.benchmarks.length > 0) tocItems.push('- [Desempenho & Benchmarks](#-desempenho--benchmarks)');
    if (config.sections.contributing) tocItems.push('- [Como Contribuir](#-como-contribuir)');
    if (config.sections.security) tocItems.push('- [Segurança](#-segurança)');
    if (config.sections.faq) tocItems.push('- [Perguntas Frequentes (FAQ)](#-perguntas-frequentes-faq)');
    if (config.sections.roadmap) tocItems.push('- [Roadmap](#-roadmap)');
    if (config.sections.githubStats) tocItems.push('- [Estatísticas do GitHub](#-estatísticas-do-github)');
    if (config.sections.license) tocItems.push('- [Licença & Agradecimentos](#-licença--agradecimentos)');

    parts.push(`## 📑 Índice de Conteúdo\n\n${tocItems.join('\n')}\n\n---`);
  }

  // 3. Visão Geral
  if (config.sections.overview) {
    parts.push(`## 🌟 Visão Geral

> **Problema que este projeto resolve:** Abordagens tradicionais frequentemente sofrem com acoplamento rígido, configurações frágeis e alto atrito de integração. O **${safeName}** foi projetado desde o primeiro dia para eliminar esses gargalos com uma arquitetura modular, previsível e sem dependências desnecessárias.

${config.description || 'Uma solução moderna desenvolvida para garantir alta produtividade de engenharia e total compatibilidade multiplataforma.'}

### Pilares Fundamentais

- ⚡ **Desempenho Extremo:** Otimizado para baixa sobrecarga de memória e tempos de resposta velozes.
- 🧩 **Arquitetura Desacoplada:** Cada componente atua como uma unidade independente e facilmente substituível.
- 🛡️ **Segurança Defensiva:** Validação estrita de tipos em tempo de compilação e tolerância a falhas.
- 🌐 **Ecossistema Poliglota:** Ergonomia nativa e idiomática em qualquer linguagem de programação.\n\n---`);
  }

  // 4. Capturas de Tela do Aplicativo / Sistema
  if (config.sections.screenshots && config.screenshots && config.screenshots.length > 0) {
    const layout = config.screenshotLayout || 'grid';
    const shots = config.screenshots;

    let galleryContent = '';

    if (layout === 'grid' && shots.length > 1) {
      // 2-column table grid
      const rows: string[] = [];
      rows.push('| Captura de Tela | Descrição & Detalhes |');
      rows.push('| :--- | :--- |');

      shots.forEach((shot) => {
        const imageCell = `**${shot.title}**<br><br><img src="${shot.url}" alt="${shot.title}" width="480" />`;
        const descCell = `${shot.description}<br><br>*Tipo:* \`${shot.type}\``;
        rows.push(`| ${imageCell} | ${descCell} |`);
      });

      galleryContent = rows.join('\n');
    } else {
      // Stacked single layout
      galleryContent = shots.map((shot) => `### 🖼️ ${shot.title}

> ${shot.description}

<div align="center">
  <img src="${shot.url}" alt="${shot.title}" width="850" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>`).join('\n\n');
    }

    parts.push(`## 📸 Capturas de Tela & Demonstração

Confira abaixo a interface e o funcionamento prático do sistema em diferentes contextos:

${galleryContent}\n\n---`);
  }

  // 5. Funcionalidades
  if (config.sections.features && config.features.length > 0) {
    const featureList = config.features.map(f => `- [x] **${f.split(' ')[0]}**: ${f}`).join('\n');
    parts.push(`## ✨ Funcionalidades Principais\n\n${featureList}\n\n---`);
  }

  // 6. Arquitetura
  if (config.sections.architecture) {
    parts.push(`## 📐 Arquitetura do Sistema

O diagrama a seguir ilustra o fluxo de processamento e a comunicação entre componentes:

\`\`\`mermaid
flowchart TD
    Clientes[Aplicações Clientes / SDKs] -->|HTTP / gRPC / CLI| Gateway[Ingress Gateway / Roteador]
    Gateway --> Auth[Autenticação & Rate Limiting]
    Auth --> Core[Núcleo de Processamento & Regras]
    Core --> Cache[(Cache Distribuído / Redis)]
    Core --> Storage[(Banco de Dados Relacional)]
    Core --> Workers[Fila de Tarefas & Workers Assíncronos]
\`\`\`\n\n---`);
  }

  // 7. Estrutura de Diretórios
  if (config.sections.directoryStructure) {
    parts.push(`## 📂 Estrutura de Diretórios

\`\`\`text
.
├── .github/
│   ├── workflows/             # Pipelines de CI/CD automatizadas
│   └── ISSUE_TEMPLATE/        # Modelos padronizados de issues e bugs
├── src/ / pkg/                # Código-fonte principal da aplicação
│   ├── api/                   # Controladores e adaptadores de entrada
│   ├── core/                  # Entidades de domínio e regras de negócio
│   ├── config/                # Carregador de variáveis de ambiente
│   └── utils/                 # Funções utilitárias e telemetria
├── examples/                  # Exemplos práticos executáveis
├── tests/                     # Testes unitários, de integração e de carga
├── docker/                    # Dockerfile multi-stage e docker-compose
├── .env.example               # Modelo de variáveis de ambiente
└── README.md                  # Documentação do projeto
\`\`\`\n\n---`);
  }

  // 8. Pré-requisitos
  if (config.sections.prerequisites) {
    const prereqs: string[] = [
      '| **Git** | `2.38+` | Clonagem e controle de versão |',
    ];

    if (config.primaryLanguages.includes('typescript')) {
      prereqs.push('| **Node.js** | `18.0+` (LTS) / Bun 1.1+ | Execução em TypeScript / JavaScript |');
    }
    if (config.primaryLanguages.includes('python')) {
      prereqs.push('| **Python** | `3.10+` | Execução de scripts e automação |');
    }
    if (config.primaryLanguages.includes('go')) {
      prereqs.push('| **Go** | `1.22+` | Compilação de serviços concorrentes |');
    }
    if (config.primaryLanguages.includes('rust')) {
      prereqs.push('| **Rust** | `1.75+` (stable) | Compilação do motor de alta performance |');
    }
    if (config.primaryLanguages.includes('docker')) {
      prereqs.push('| **Docker & Compose** | `24.0+` | Ambiente conteinerizado e bancos locais |');
    }

    parts.push(`## 📋 Pré-requisitos

Certifique-se de possuir os seguintes requisitos instalados em seu ambiente:

| Ferramenta / Runtime | Versão Mínima | Finalidade |
| :--- | :--- | :--- |
${prereqs.join('\n')}\n\n---`);
  }

  // 9. Instalação
  if (config.sections.installation) {
    const installBlocks: string[] = [];

    config.primaryLanguages.forEach((langId) => {
      const lang = LANGUAGE_REGISTRY[langId];
      if (!lang) return;

      const pms = lang.packageManagers.map((pm) => {
        const cmd = pm.command
          .replace(/\{\{PACKAGE_NAME\}\}/g, safeRepo)
          .replace(/\{\{GITHUB_USER\}\}/g, safeUser)
          .replace(/\{\{GITHUB_REPO\}\}/g, safeRepo);
        return `# Via ${pm.name}${pm.recommended ? ' (Recomendado)' : ''}\n${cmd}`;
      }).join('\n\n');

      installBlocks.push(`#### ${lang.name}\n\n\`\`\`bash\n${pms}\n\`\`\``);
    });

    parts.push(`## 📦 Instalação

Escolha o gerenciador de pacotes compatível com seu ambiente:

${installBlocks.join('\n\n')}\n\n---`);
  }

  // 10. Variáveis de Ambiente
  if (config.sections.environmentConfig && config.envVars.length > 0) {
    const envRows = config.envVars.map(v => 
      `| \`${v.key}\` | \`${v.type}\` | ${v.defaultValue ? `\`${v.defaultValue}\`` : '—'} | ${v.description} | ${v.required ? '**Sim**' : 'Não'} |`
    ).join('\n');

    parts.push(`## ⚙️ Variáveis de Ambiente

Crie o arquivo de configuração local copiando o modelo de exemplo:

\`\`\`bash
cp .env.example .env
\`\`\`

| Variável | Tipo | Padrão | Descrição | Obrigatória |
| :--- | :--- | :--- | :--- | :---: |
${envRows}

> [!WARNING]
> Nunca versione chaves privadas de API ou arquivos \`.env\` reais em repositórios públicos. Mantenha o \`.env\` listado em seu \`.gitignore\`.\n\n---`);
  }

  // 11. Início Rápido & Exemplos
  if (config.sections.quickStart) {
    const codeTabs: string[] = [];

    config.primaryLanguages.forEach((langId) => {
      const lang = LANGUAGE_REGISTRY[langId];
      if (!lang) return;

      const snakeName = safeRepo.replace(/-/g, '_');
      const code = lang.quickStartCode
        .replace(/\{\{PACKAGE_NAME\}\}/g, safeRepo)
        .replace(/\{\{PACKAGE_NAME_SNAKE\}\}/g, snakeName)
        .replace(/\{\{GITHUB_USER\}\}/g, safeUser)
        .replace(/\{\{GITHUB_REPO\}\}/g, safeRepo);

      codeTabs.push(`### ${lang.name}

\`\`\`${lang.extension}
${code}
\`\`\``);
    });

    parts.push(`## 🚀 Início Rápido & Exemplos

Exemplos práticos e funcionais para inicialização imediata:

${codeTabs.join('\n\n')}\n\n---`);
  }

  // 12. Comandos CLI
  if (config.sections.cliReference && config.cliCommands.length > 0) {
    const cmdRows = config.cliCommands.map(c => 
      `| \`${c.command}\` | ${c.description} | \`${c.example}\` |`
    ).join('\n');

    parts.push(`## 💻 Comandos CLI

| Comando | Finalidade | Exemplo de Execução |
| :--- | :--- | :--- |
${cmdRows}\n\n---`);
  }

  // 13. Referência da API
  if (config.sections.apiReference && config.apiEndpoints.length > 0) {
    const apiRows = config.apiEndpoints.map(e => 
      `| \`${e.method}\` | \`${e.path}\` | ${e.description} | ${e.authRequired ? '**Sim**' : 'Não'} |`
    ).join('\n');

    const sample = config.apiEndpoints.find(e => e.samplePayload);
    let sampleBlock = '';
    if (sample) {
      sampleBlock = `\n\n#### Exemplo de Requisição (\`${sample.method} ${sample.path}\`)\n
\`\`\`bash
curl -X ${sample.method} https://api.${safeRepo}.dev${sample.path} \\
  -H "Authorization: Bearer $API_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${sample.samplePayload}'
\`\`\`

#### Exemplo de Resposta (\`200 OK\`)

\`\`\`json
${sample.sampleResponse || '{\n  "status": "sucesso",\n  "mensagem": "Operação realizada com êxito."\n}'}
\`\`\``;
    }

    parts.push(`## 📡 Documentação da API

Quando implantado como microsserviço de rede, os seguintes endpoints são disponibilizados:

| Método | Rota | Descrição | Requer Autenticação |
| :--- | :--- | :--- | :---: |
${apiRows}${sampleBlock}\n\n---`);
  }

  // 14. Testes & Qualidade
  if (config.sections.testing) {
    const testLines: string[] = [];
    config.primaryLanguages.forEach((langId) => {
      const lang = LANGUAGE_REGISTRY[langId];
      if (lang) {
        testLines.push(`**${lang.name}:**\n\`\`\`bash\n# Executar testes unitários e de integração\n${lang.testCommand}\n\n# Executar análise estática (linter)\n${lang.lintCommand}\n\`\`\``);
      }
    });

    parts.push(`## 🧪 Testes & Qualidade

Comandos para executar a bateria de testes e verificação:

${testLines.join('\n\n')}\n\n---`);
  }

  // 15. Deploy & CI/CD
  if (config.sections.deployment) {
    parts.push(`## 🚢 Deploy & CI/CD

### Execução via Docker Compose

Para subir toda a infraestrutura localmente com banco de dados e cache:

\`\`\`bash
# Compilar e iniciar contêineres em segundo plano
docker compose up -d --build

# Inspecionar logs em tempo real
docker compose logs -f
\`\`\`

### Pipeline Automatizada no GitHub Actions

Cada Pull Request ou envio para o branch \`main\` dispara validações automáticas de:
- Compilação cruzada em matriz (Ubuntu e macOS)
- Execução de testes automatizados com relatório de cobertura de código
- Análise de segurança de dependências e verificação de licenças\n\n---`);
  }

  // 16. Benchmarks
  if (config.sections.benchmarks && config.benchmarks.length > 0) {
    const benchRows = config.benchmarks.map(b => 
      `| **${b.stack}** | \`${b.throughput}\` | \`${b.latencyP50}\` | \`${b.latencyP99}\` | \`${b.memory}\` |`
    ).join('\n');

    parts.push(`## ⚡ Desempenho & Benchmarks

Medições realizadas em instâncias dedicadas de nuvem (8 vCPUs, 16GB RAM):

| Plataforma / Runtime | Vazão (Throughput) | Latência p50 | Latência p99 | Consumo de RAM |
| :--- | :---: | :---: | :---: | :---: |
${benchRows}\n\n---`);
  }

  // 17. Contribuição
  if (config.sections.contributing) {
    parts.push(`## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Para colaborar com melhorias:

1. **Faça um Fork** do repositório no GitHub.
2. **Crie um Branch** para a sua funcionalidade:
   \`\`\`bash
   git checkout -b feat/minha-nova-funcionalidade
   \`\`\`
3. **Faça o Commit das Alterações** seguindo a convenção [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   - \`feat:\` Adiciona nova funcionalidade para o usuário.
   - \`fix:\` Corrige uma falha ou bug.
   - \`docs:\` Alterações apenas na documentação.
   - \`perf:\` Otimizações de desempenho e memória.
   - \`test:\` Adição ou correção de testes automatizados.
4. **Valide Localmente:**
   \`\`\`bash
   make test && make lint
   \`\`\`
5. **Abra um Pull Request** detalhando as modificações realizadas.

> [!NOTE]
> Todos os participantes devem seguir o nosso [Código de Conduta](CODE_OF_CONDUCT.md).\n\n---`);
  }

  // 18. Segurança
  if (config.sections.security) {
    parts.push(`## 🔒 Segurança & Divulgação Responsável

A segurança do projeto é tratada com rigor. Se identificar uma vulnerabilidade:

- **NÃO crie uma issue pública relatando falhas de segurança.**
- Envie um relatório através de [GitHub Security Advisories](https://github.com/${safeUser}/${safeRepo}/security/advisories/new) ou pelo e-mail **seguranca@${safeRepo}.dev**.
- Todas as mensagens são analisadas em até **24 horas** e corrigidas em até **7 dias úteis**.\n\n---`);
  }

  // 19. FAQ
  if (config.sections.faq) {
    parts.push(`## ❓ Perguntas Frequentes (FAQ)

<details>
<summary><strong>P: Como resolver falhas de timeout de conexão na inicialização?</strong></summary>

Certifique-se de que suas variáveis de ambiente (\`DATABASE_URL\`, \`REDIS_URL\`) estão acessíveis a partir da sua rede. Se estiver usando Docker, confirme que os contêineres compartilham a mesma rede bridge.
</details>

<details>
<summary><strong>P: Posso utilizar este projeto em ambientes Serverless ou Edge?</strong></summary>

Sim! As bibliotecas clientes são projetadas com zero dependências nativas em C, sendo totalmente compatíveis com AWS Lambda, Cloudflare Workers e isolados V8.
</details>

<details>
<summary><strong>P: Onde acompanho o histórico de versões e mudanças drásticas?</strong></summary>

Todas as atualizações e notas de versão estão documentadas no arquivo [CHANGELOG.md](CHANGELOG.md).
</details>\n\n---`);
  }

  // 20. Roadmap
  if (config.sections.roadmap) {
    parts.push(`## 🗺️ Roadmap & Marcos Futuros

- [x] **Fase 1:** Arquitetura do núcleo e bindings oficiais
- [x] **Fase 2:** Suporte poliglota em TypeScript, Python, Go e Rust
- [ ] **Fase 3:** Modo de cluster distribuído com algoritmo de consenso Raft
- [ ] **Fase 4:** Compilação nativa para WebAssembly (Wasm) no navegador
- [ ] **Fase 5:** Motor de cache preditivo com auto-ajuste inteligente\n\n---`);
  }

  // 21. Estatísticas do GitHub
  if (config.sections.githubStats) {
    const statsUser = config.githubStats?.username || config.githubUser || 'usuario';
    const statsTheme = config.githubStats?.theme || 'tokyonight';
    const cardBlocks: string[] = [];

    // Card Principal
    cardBlocks.push(`<a href="https://github.com/${statsUser}">
  <img src="https://github-readme-stats.vercel.app/api?username=${statsUser}&show_icons=true&theme=${statsTheme}&hide_border=false&count_private=true" alt="Estatísticas do GitHub de ${statsUser}" />
</a>`);

    // Card de Streak
    if (config.githubStats?.showStreak) {
      cardBlocks.push(`<a href="https://github.com/${statsUser}">
  <img src="https://streak-stats.demolab.com/?user=${statsUser}&theme=${statsTheme}&hide_border=false" alt="Streak de Contribuições de ${statsUser}" />
</a>`);
    }

    // Card de Linguagens
    if (config.githubStats?.showTopLangs) {
      cardBlocks.push(`<a href="https://github.com/${statsUser}">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${statsUser}&layout=compact&theme=${statsTheme}&hide_border=false" alt="Linguagens Mais Utilizadas por ${statsUser}" />
</a>`);
    }

    // Troféus de Perfil
    if (config.githubStats?.showTrophies) {
      cardBlocks.push(`<a href="https://github.com/${statsUser}">
  <img src="https://github-profile-trophy.vercel.app/?username=${statsUser}&theme=${statsTheme}&margin-w=4&margin-h=4&no-bg=false&no-frame=false" alt="Troféus de ${statsUser}" />
</a>`);
    }

    parts.push(`## 📊 Estatísticas do GitHub

<div align="center">

${cardBlocks.join('\n\n')}

</div>\n\n---`);
  }

  // 22. Licença
  if (config.sections.license) {
    parts.push(`## 📄 Licença & Agradecimentos

Este projeto está licenciado sob os termos da **Licença ${safeLicense}** - consulte o arquivo [\`LICENSE\`](LICENSE) para maiores detalhes.

### Agradecimentos

- Desenvolvido com dedicação por [${config.authorName || 'Equipe de Engenharia'}](${config.authorUrl || `https://github.com/${safeUser}`}).
- Badges fornecidos por [Shields.io](https://shields.io/).
- Diagramas renderizados nativamente com [Mermaid.js](https://mermaid.js.org/).

<div align="center">

⭐ **Se este projeto foi útil para você, considere deixar uma estrela no GitHub!** ⭐

</div>`);
  }

  return parts.join('\n\n');
}

export function generateAIPrompt(config: ProjectConfig): string {
  const safeName = config.name || '{{NOME_DO_PROJETO}}';
  const safeUser = config.githubUser || '{{USUARIO_GITHUB}}';
  const safeRepo = config.githubRepo || '{{REPOSITORIO}}';
  const langs = config.primaryLanguages.join(', ');

  return `# PROMPT MESTRE PARA IA: GERADOR UNIVERSAL DE README.MD (TOTALMENTE EM PORTUGUÊS)

Copie e envie o prompt abaixo para sua IA favorita (Gemini, Claude, ChatGPT, Cursor, Copilot) para gerar o README completo para qualquer repositório:

\`\`\`markdown
Você é um Arquiteto de Software Principal e Especialista em Engenharia de Código Aberto.
Sua missão é gerar um arquivo \`README.md\` COMPLETO, EXAUSTIVO, MODULAR e PROFISSIONAL para o repositório baseado nas informações abaixo ou no código fonte do projeto.
TODO O CONTEÚDO DEVE SER EM PORTUGUÊS DO BRASIL.

### REGRAS CRÍTICAS DE EXECUÇÃO:
1. NÃO OMITA NENHUMA SEÇÃO. Cada seção listada abaixo é obrigatória. Não use placeholders preguiçosos como "adicione seu código aqui". Escreva código REAL, compilável e idiomático.
2. SUPORTE POLIGLOTA: Adapte a sintaxe, gerenciadores de pacotes e snippets para as linguagens do projeto (${langs}).
3. CAPTURAS DE TELA & DEMONSTRAÇÃO VISUAL: Inclua uma seção com capturas de tela do sistema/aplicativo com títulos e descrições claras.
4. EXTREMA FIDELIDADE AO GITHUB FLAVORED MARKDOWN (GFM):
   - Badges estilizados do Shields.io (style=for-the-badge).
   - Tabelas markdown limpas para requisitos, variáveis de ambiente (.env), comandos CLI e endpoints de API.
   - Diagrama de arquitetura com sintaxe nativa do Mermaid (\`flowchart TD\`).
   - Callouts nativos do GitHub (\`> [!NOTE]\`, \`> [!WARNING]\`, \`> [!TIP]\`).
   - Menus retráteis \`<details><summary>\` para FAQ.
   - Checklist de recursos com \`[x]\`.
5. PADRÃO CONVENTIONAL COMMITS: Inclua a tabela formal de convenção de commits para guiar novos contribuidores.

### DADOS DO PROJETO:
- Nome do Projeto: ${safeName}
- Slogan / Tagline: ${config.tagline}
- Organização / Usuário: ${safeUser}
- Repositório: ${safeRepo}
- Categoria: ${config.category}
- Linguagens Primárias: ${langs}
- Licença: ${config.license}

### ESTRUTURA MODULAR OBRIGATÓRIA (EM PORTUGUÊS):
1. Header Centralizado (<div align="center">, Título, Tagline, Badges Shields.io, Links de Navegação rápida)
2. Índice de Conteúdo (Table of Contents ancorado)
3. Visão Geral (Gargalo real que o sistema elimina e proposta de valor)
4. Capturas de Tela & Demonstração Visual (Imagens do aplicativo/sistema com descrição)
5. Funcionalidades Principais (Matriz de recursos com [x])
6. Arquitetura do Sistema (Diagrama Mermaid com fluxo de dados entre clientes, gateway, core, cache e banco)
7. Estrutura de Diretórios (Árvore ASCII da estrutura de pastas do projeto)
8. Pré-requisitos (Tabela com Git, Runtimes e versões mínimas exigidas)
9. Instalação (Comandos para todos os gerenciadores relevantes: npm/pnpm/yarn/bun, pip/poetry/uv, cargo, go get, docker)
10. Variáveis de Ambiente (Tabela detalhada do .env com tipo, default, descrição e obrigatoriedade)
11. Início Rápido & Exemplos Práticos (Snippets de código funcionais para cada linguagem selecionada)
12. Comandos CLI (Tabela de comandos, flags e exemplos práticos de terminal)
13. Documentação da API (Tabela de endpoints HTTP/REST, com exemplo de requisição curl e resposta JSON)
14. Testes & Qualidade (Comandos para unit tests, coverage, linters e formatadores)
15. Deploy & CI/CD (Docker Compose e pipeline do GitHub Actions)
16. Desempenho & Benchmarks (Tabela de vazão req/s, latência p50/p99 e consumo de memória)
17. Como Contribuir (Fluxo Fork-Branch-PR e especificação de Conventional Commits: feat, fix, docs, refactor, perf, test, chore)
18. Política de Segurança (Instruções de divulgação responsável de vulnerabilidades)
19. Perguntas Frequentes (FAQ) (Dúvidas frequentes em menus retráteis <details><summary>)
20. Roadmap & Marcos Futuros (Fases entregues e marcos futuros com checklists)
21. Estatísticas do GitHub (Cards de estatísticas, streak, linguagens mais usadas de ${config.githubStats?.username || safeUser})
22. Licença & Agradecimentos (Termos da licença ${config.license}, créditos e chamada para estrelar o repositório)
\`\`\`
`;
}
