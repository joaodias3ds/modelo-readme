import { ProjectConfig, SupportedLanguage } from '../types';
import { LANGUAGE_REGISTRY } from '../data/languages';

export function generateMarkdown(config: ProjectConfig): string {
  const parts: string[] = [];

  const safeName = config.name || 'Project Name';
  const safeTagline = config.tagline || 'A powerful, modular open-source solution.';
  const safeUser = config.githubUser || 'username';
  const safeRepo = config.githubRepo || 'repository';
  const safeLicense = config.license || 'MIT';

  // 1. Header / Hero
  if (config.sections.header) {
    const badges: string[] = [];
    if (config.badges.ci) {
      badges.push(`[![Build Status](https://img.shields.io/github/actions/workflow/status/${safeUser}/${safeRepo}/ci.yml?branch=main&style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/${safeUser}/${safeRepo}/actions)`);
    }
    if (config.badges.release) {
      badges.push(`[![Release](https://img.shields.io/github/v/release/${safeUser}/${safeRepo}?style=for-the-badge&logo=semver&logoColor=white&color=blue)](https://github.com/${safeUser}/${safeRepo}/releases)`);
    }
    if (config.badges.license) {
      badges.push(`[![License: ${safeLicense}](https://img.shields.io/badge/License-${safeLicense}-green.svg?style=for-the-badge)](LICENSE)`);
    }
    if (config.badges.coverage) {
      badges.push(`[![Coverage](https://img.shields.io/codecov/c/github/${safeUser}/${safeRepo}?style=for-the-badge&logo=codecov&logoColor=white)](https://codecov.io/gh/${safeUser}/${safeRepo})`);
    }
    if (config.badges.docker && config.primaryLanguages.includes('docker')) {
      badges.push(`[![Docker Pulls](https://img.shields.io/docker/pulls/${safeUser}/${safeRepo}?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/${safeUser}/${safeRepo})`);
    }
    if (config.badges.discord) {
      badges.push(`[![Discord Community](https://img.shields.io/discord/123456789?style=for-the-badge&logo=discord&logoColor=white&color=5865F2)](https://discord.gg/invite)`);
    }
    if (config.badges.npm && config.primaryLanguages.includes('typescript')) {
      badges.push(`[![npm version](https://img.shields.io/npm/v/${safeRepo}?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/${safeRepo})`);
    }
    if (config.badges.pypi && config.primaryLanguages.includes('python')) {
      badges.push(`[![PyPI version](https://img.shields.io/pypi/v/${safeRepo}?style=for-the-badge&logo=pypi&logoColor=white&color=3775A9)](https://pypi.org/project/${safeRepo})`);
    }

    parts.push(`<div align="center">

# 🚀 ${safeName}

**${safeTagline}**

${badges.join('\n')}

<p align="center">
  <a href="https://github.com/${safeUser}/${safeRepo}/blob/main/docs/README.md">Documentation</a> ·
  <a href="https://github.com/${safeUser}/${safeRepo}/issues/new?template=bug_report.md">Report Bug</a> ·
  <a href="https://github.com/${safeUser}/${safeRepo}/issues/new?template=feature_request.md">Request Feature</a> ·
  <a href="https://github.com/${safeUser}/${safeRepo}/releases">Releases</a>
</p>

</div>\n\n---`);
  }

  // 2. Table of Contents
  if (config.sections.tableOfContents) {
    const tocItems: string[] = [];
    if (config.sections.overview) tocItems.push('- [Overview](#-overview)');
    if (config.sections.features) tocItems.push('- [Key Features](#-key-features)');
    if (config.sections.architecture) tocItems.push('- [System Architecture](#-system-architecture)');
    if (config.sections.directoryStructure) tocItems.push('- [Directory Structure](#-directory-structure)');
    if (config.sections.prerequisites) tocItems.push('- [Prerequisites](#-prerequisites)');
    if (config.sections.installation) tocItems.push('- [Installation](#-installation)');
    if (config.sections.environmentConfig) tocItems.push('- [Environment Configuration](#-environment-configuration)');
    if (config.sections.quickStart) tocItems.push('- [Quick Start & Usage](#-quick-start--usage)');
    if (config.sections.cliReference && config.cliCommands.length > 0) tocItems.push('- [CLI Reference](#-cli-reference)');
    if (config.sections.apiReference && config.apiEndpoints.length > 0) tocItems.push('- [API Reference](#-api-reference)');
    if (config.sections.testing) tocItems.push('- [Testing & Quality](#-testing--quality)');
    if (config.sections.deployment) tocItems.push('- [Deployment & CI/CD](#-deployment--cicd)');
    if (config.sections.benchmarks && config.benchmarks.length > 0) tocItems.push('- [Performance & Benchmarks](#-performance--benchmarks)');
    if (config.sections.contributing) tocItems.push('- [Contributing](#-contributing)');
    if (config.sections.security) tocItems.push('- [Security](#-security)');
    if (config.sections.faq) tocItems.push('- [FAQ & Troubleshooting](#-faq--troubleshooting)');
    if (config.sections.roadmap) tocItems.push('- [Roadmap](#-roadmap)');
    if (config.sections.license) tocItems.push('- [License & Acknowledgments](#-license--acknowledgments)');

    parts.push(`## 📑 Table of Contents\n\n${tocItems.join('\n')}\n\n---`);
  }

  // 3. Overview
  if (config.sections.overview) {
    parts.push(`## 🌟 Overview

> **Why this project exists:** Traditional approaches often suffer from tight coupling, fragile configurations, and high cognitive overhead. **${safeName}** was designed from the ground up to solve these challenges with modular elegance, strict type guarantees, and zero unnecessary dependencies.

${config.description || 'A modern, modular system built for high developer productivity and seamless multi-language compatibility.'}

### Core Philosophy

- ⚡ **High Efficiency:** Optimized for sub-millisecond dispatch and minimal memory footprint.
- 🧩 **Modular & Decoupled:** Every component is an independent, replaceable unit.
- 🛡️ **Defensive Engineering:** Strict runtime invariants, type safety, and comprehensive test coverage.
- 🌐 **Polyglot First:** Native developer ergonomics across multiple languages without foreign feeling conventions.\n\n---`);
  }

  // 4. Features
  if (config.sections.features && config.features.length > 0) {
    const featureList = config.features.map(f => `- [x] **${f.split(' ')[0]}**: ${f}`).join('\n');
    parts.push(`## ✨ Key Features\n\n${featureList}\n\n---`);
  }

  // 5. Architecture
  if (config.sections.architecture) {
    parts.push(`## 📐 System Architecture

The following diagram illustrates how requests flow through the application:

\`\`\`mermaid
flowchart TD
    Clients[Client Applications / SDKs] -->|HTTP / gRPC / CLI| Gateway[Ingress Gateway / Router]
    Gateway --> Auth[Authentication & Rate Limiting]
    Auth --> Core[Core Engine Pipeline]
    Core --> Cache[(Cache & State Manager)]
    Core --> Storage[(Database / Persistence)]
    Core --> AsyncWorker[Background Queue & Workers]
\`\`\`\n\n---`);
  }

  // 6. Directory Structure
  if (config.sections.directoryStructure) {
    parts.push(`## 📂 Directory Structure

\`\`\`text
.
├── .github/
│   ├── workflows/             # CI/CD automation pipelines
│   └── ISSUE_TEMPLATE/        # Standardized bug & feature templates
├── src/ / pkg/                # Core business logic and domain entities
│   ├── api/                   # Ingress controllers & transport adapters
│   ├── core/                  # Pure algorithms and state handlers
│   ├── config/                # Environment configuration loader
│   └── utils/                 # Shared helpers and telemetry
├── examples/                  # Runnable polyglot code examples
├── tests/                     # Unit, integration, and fuzz test suites
├── docker/                    # Multi-stage Dockerfile & compose files
├── .env.example               # Reference environment variables
└── README.md                  # Project documentation
\`\`\`\n\n---`);
  }

  // 7. Prerequisites
  if (config.sections.prerequisites) {
    const prereqs: string[] = [
      '| **Git** | `2.38+` | Repository cloning and version tracking |',
    ];

    if (config.primaryLanguages.includes('typescript')) {
      prereqs.push('| **Node.js** | `18.0+` (LTS) / Bun 1.1+ | TypeScript / JavaScript execution |');
    }
    if (config.primaryLanguages.includes('python')) {
      prereqs.push('| **Python** | `3.10+` | Python client & automation scripts |');
    }
    if (config.primaryLanguages.includes('go')) {
      prereqs.push('| **Go** | `1.22+` | High-concurrency services |');
    }
    if (config.primaryLanguages.includes('rust')) {
      prereqs.push('| **Rust** | `1.75+` (stable) | High-performance core compilation |');
    }
    if (config.primaryLanguages.includes('docker')) {
      prereqs.push('| **Docker & Compose** | `24.0+` | Containerized runtime and local database stack |');
    }

    parts.push(`## 📋 Prerequisites

Ensure the following tools are available in your development environment:

| Requirement | Minimum Version | Purpose |
| :--- | :--- | :--- |
${prereqs.join('\n')}\n\n---`);
  }

  // 8. Installation
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
        return `# Using ${pm.name}${pm.recommended ? ' (Recommended)' : ''}\n${cmd}`;
      }).join('\n\n');

      installBlocks.push(`#### ${lang.name}\n\n\`\`\`bash\n${pms}\n\`\`\``);
    });

    parts.push(`## 📦 Installation

Select your language or package manager:

${installBlocks.join('\n\n')}\n\n---`);
  }

  // 9. Environment Configuration
  if (config.sections.environmentConfig && config.envVars.length > 0) {
    const envRows = config.envVars.map(v => 
      `| \`${v.key}\` | \`${v.type}\` | ${v.defaultValue ? `\`${v.defaultValue}\`` : '—'} | ${v.description} | ${v.required ? '**Yes**' : 'No'} |`
    ).join('\n');

    parts.push(`## ⚙️ Environment Configuration

Initialize your local environment by creating a \`.env\` file from the example:

\`\`\`bash
cp .env.example .env
\`\`\`

| Variable | Type | Default | Description | Required |
| :--- | :--- | :--- | :--- | :---: |
${envRows}

> [!WARNING]
> Never commit confidential API tokens, private keys, or actual \`.env\` files to public version control. Keep \`.env\` in your \`.gitignore\` file.\n\n---`);
  }

  // 10. Quick Start & Usage
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

    parts.push(`## 🚀 Quick Start & Usage

Practical, copy-paste ready examples across supported runtimes:

${codeTabs.join('\n\n')}\n\n---`);
  }

  // 11. CLI Reference
  if (config.sections.cliReference && config.cliCommands.length > 0) {
    const cmdRows = config.cliCommands.map(c => 
      `| \`${c.command}\` | ${c.description} | \`${c.example}\` |`
    ).join('\n');

    parts.push(`## 💻 CLI Reference

| Command | Purpose | Example Usage |
| :--- | :--- | :--- |
${cmdRows}\n\n---`);
  }

  // 12. API Reference
  if (config.sections.apiReference && config.apiEndpoints.length > 0) {
    const apiRows = config.apiEndpoints.map(e => 
      `| \`${e.method}\` | \`${e.path}\` | ${e.description} | ${e.authRequired ? '**Yes**' : 'No'} |`
    ).join('\n');

    const sample = config.apiEndpoints.find(e => e.samplePayload);
    let sampleBlock = '';
    if (sample) {
      sampleBlock = `\n\n#### Sample Request (\`${sample.method} ${sample.path}\`)\n
\`\`\`bash
curl -X ${sample.method} https://api.${safeRepo}.dev${sample.path} \\
  -H "Authorization: Bearer $API_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${sample.samplePayload}'
\`\`\`

#### Sample Response (\`200 OK\`)

\`\`\`json
${sample.sampleResponse || '{\n  "status": "success",\n  "message": "Operation completed."\n}'}
\`\`\``;
    }

    parts.push(`## 📡 API Reference

When hosted as a network microservice, the following endpoints are exposed:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
${apiRows}${sampleBlock}\n\n---`);
  }

  // 13. Testing
  if (config.sections.testing) {
    const testLines: string[] = [];
    config.primaryLanguages.forEach((langId) => {
      const lang = LANGUAGE_REGISTRY[langId];
      if (lang) {
        testLines.push(`**${lang.name}:**\n\`\`\`bash\n# Run tests\n${lang.testCommand}\n\n# Run linter\n${lang.lintCommand}\n\`\`\``);
      }
    });

    parts.push(`## 🧪 Testing & Code Quality

Run tests and verification suites for your runtime:

${testLines.join('\n\n')}\n\n---`);
  }

  // 14. Deployment
  if (config.sections.deployment) {
    parts.push(`## 🚢 Deployment & CI/CD

### Docker Deployment

To launch the complete application stack locally with Docker Compose:

\`\`\`bash
# Build and run containers in detached mode
docker compose up -d --build

# View container logs
docker compose logs -f
\`\`\`

### Automated CI Pipeline

Every pull request initiates an automated GitHub Actions pipeline validating:
- Multi-platform matrix builds (Ubuntu, macOS)
- Unit and integration tests with code coverage thresholds
- Static security analysis and vulnerability scanning\n\n---`);
  }

  // 15. Benchmarks
  if (config.sections.benchmarks && config.benchmarks.length > 0) {
    const benchRows = config.benchmarks.map(b => 
      `| **${b.stack}** | \`${b.throughput}\` | \`${b.latencyP50}\` | \`${b.latencyP99}\` | \`${b.memory}\` |`
    ).join('\n');

    parts.push(`## ⚡ Performance & Benchmarks

Benchmarking conducted on standard cloud instances (8 vCPUs, 16GB RAM):

| Runtime / Engine | Throughput | Latency p50 | Latency p99 | Memory Usage |
| :--- | :---: | :---: | :---: | :---: |
${benchRows}\n\n---`);
  }

  // 16. Contributing
  if (config.sections.contributing) {
    parts.push(`## 🤝 Contributing

We welcome contributions from developers worldwide! Please follow our contribution workflow:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch:**
   \`\`\`bash
   git checkout -b feat/your-feature-name
   \`\`\`
3. **Commit Your Changes** following [Conventional Commits](https://www.conventionalcommits.org/):
   - \`feat:\` New user-facing functionality.
   - \`fix:\` Bug fixes.
   - \`docs:\` Documentation improvements.
   - \`perf:\` Performance enhancements.
   - \`test:\` Adding missing tests.
4. **Ensure Verification Passes:**
   \`\`\`bash
   make test && make lint
   \`\`\`
5. **Open a Pull Request** with a concise description of your changes.

> [!NOTE]
> All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).\n\n---`);
  }

  // 17. Security
  if (config.sections.security) {
    parts.push(`## 🔒 Security

We take software security seriously. If you discover a potential vulnerability:

- **Do NOT create public GitHub issues for security vulnerabilities.**
- Report privately via [GitHub Security Advisories](https://github.com/${safeUser}/${safeRepo}/security/advisories/new) or email **security@${safeRepo}.dev**.
- Vulnerabilities are triaged within **24 hours**, and patches are published within **7 days**.\n\n---`);
  }

  // 18. FAQ
  if (config.sections.faq) {
    parts.push(`## ❓ FAQ & Troubleshooting

<details>
<summary><strong>Q: How do I resolve connection timeout errors during startup?</strong></summary>

Verify that your environment variables (\`DATABASE_URL\`, \`REDIS_URL\`) point to reachable addresses. If using Docker, ensure that both containers reside on the same network bridge.
</details>

<details>
<summary><strong>Q: Can I run this in serverless or edge environments?</strong></summary>

Yes! The core client libraries are designed with zero native binary bindings and can run in AWS Lambda, Cloudflare Workers, and standard V8 isolates.
</details>

<details>
<summary><strong>Q: How do I report breaking changes or feature requests?</strong></summary>

Check our open [GitHub Issues](https://github.com/${safeUser}/${safeRepo}/issues) or participate in our [Discussions](https://github.com/${safeUser}/${safeRepo}/discussions) board.
</details>\n\n---`);
  }

  // 19. Roadmap
  if (config.sections.roadmap) {
    parts.push(`## 🗺️ Roadmap

- [x] **Phase 1:** Core engine architecture and primary SDK bindings
- [x] **Phase 2:** Polyglot support across TypeScript, Python, Go, and Rust
- [ ] **Phase 3:** Distributed clustering mode with Raft consensus
- [ ] **Phase 4:** WebAssembly (Wasm) browser-native runtime
- [ ] **Phase 5:** Autonomous self-tuning cache engine\n\n---`);
  }

  // 20. License
  if (config.sections.license) {
    parts.push(`## 📄 License & Acknowledgments

This project is licensed under the **${safeLicense} License** - see the [\`LICENSE\`](LICENSE) file for details.

### Acknowledgments

- Built with love and architectural discipline by [${config.authorName || 'The Engineering Team'}](${config.authorUrl || `https://github.com/${safeUser}`}).
- Badges courtesy of [Shields.io](https://shields.io/).
- Flowcharts rendered with [Mermaid.js](https://mermaid.js.org/).

<div align="center">

⭐ **If you find this project valuable, please consider giving it a star on GitHub!** ⭐

</div>`);
  }

  return parts.join('\n\n');
}

export function generateAIPrompt(config: ProjectConfig): string {
  const safeName = config.name || '{{PROJECT_NAME}}';
  const safeUser = config.githubUser || '{{GITHUB_USER}}';
  const safeRepo = config.githubRepo || '{{GITHUB_REPO}}';
  const langs = config.primaryLanguages.join(', ');

  return `# PROMPT MESTRE PARA IA: GERADOR UNIVERSAL DE README.MD (PADRÃO GITHUB)

Copie e envie o prompt abaixo para sua IA favorita (Gemini, Claude, ChatGPT, Cursor, Copilot) para gerar o README completo para qualquer repositório:

\`\`\`markdown
Você é um Arquiteto de Software Principal e Especialista em Engenharia de Código Aberto.
Sua missão é gerar um arquivo \`README.md\` COMPLETO, EXAUSTIVO, MODULAR e PROFISSIONAL para o repositório baseado nas informações abaixo ou no código fonte do projeto.

### REGRAS CRÍTICAS DE EXECUÇÃO:
1. NÃO OMITA SEÇÕES. Cada seção listada abaixo é obrigatória. Não use placeholders preguiçosos ou frases como "adicione seu código aqui". Escreva código REAL, compilável e idiomático.
2. SUPORTE POLIGLOTA: Adapte a sintaxe, gerenciadores de pacotes e snippets para as linguagens do projeto (${langs}).
3. EXTREMA FIDELIDADE AO GITHUB FLAVORED MARKDOWN (GFM):
   - Badges estilizados do Shields.io (style=for-the-badge).
   - Tabelas markdown limpas para requisitos, variáveis de ambiente (.env), comandos CLI e endpoints de API.
   - Diagrama de arquitetura com sintaxe nativa do Mermaid (\`flowchart TD\`).
   - Callouts nativos do GitHub (\`> [!NOTE]\`, \`> [!WARNING]\`, \`> [!TIP]\`).
   - Menus retráteis \`<details><summary>\` para FAQ.
   - Checklist de recursos com \`[x]\`.
4. PADRÃO CONVENTIONAL COMMITS: Inclua a tabela formal de convenção de commits para guiar novos contribuidores.

### DADOS DO PROJETO:
- Nome do Projeto: ${safeName}
- Tagline / Slogan: ${config.tagline}
- Organização / Usuário: ${safeUser}
- Repositório: ${safeRepo}
- Categoria: ${config.category}
- Linguagens Primárias: ${langs}
- Licença: ${config.license}

### ESTRUTURA MODULAR OBRIGATÓRIA:
1. Header Centralizado (<div align="center">, Título, Tagline, Badges Shields.io, Links de Navegação rápida)
2. Table of Contents (Índice de Seções ancorado)
3. Overview & Problem Statement (Qual gargalo do mundo real é resolvido e por que usar este projeto)
4. Key Features (Matriz de funcionalidades com [x])
5. System Architecture (Diagrama Mermaid com fluxo de dados entre clientes, gateway, core, cache e banco)
6. Directory Structure (Árvore ASCII da estrutura de pastas)
7. Prerequisites (Tabela com Git, Runtimes e versões mínimas exigidas)
8. Installation (Comandos para todos os gerenciadores relevantes: npm/pnpm/yarn/bun, pip/poetry/uv, cargo, go get, docker)
9. Environment Configuration (Tabela detalhada de variáveis de ambiente com tipo, default, descrição e obrigatoriedade)
10. Quick Start & Practical Usage (Snippets de código funcionais e práticos para cada linguagem selecionada)
11. CLI Reference (Tabela de comandos, flags e exemplos práticos de terminal)
12. API Reference (Tabela de endpoints HTTP/REST, com exemplo de requisição curl e resposta JSON)
13. Testing & Code Quality (Comandos para unit tests, coverage, linters e formatadores)
14. Deployment & CI/CD (Docker Compose e pipeline do GitHub Actions)
15. Performance & Benchmarks (Tabela de throughput req/s, latência p50/p99 e consumo de memória)
16. Contributing Guidelines (Fluxo Fork-Branch-PR e especificação de Conventional Commits: feat, fix, docs, refactor, perf, test, chore)
17. Security Policy (Instruções de divulgação responsável de vulnerabilidades)
18. FAQ & Troubleshooting (Dúvidas frequentes e erros comuns em menus retráteis <details><summary>)
19. Roadmap (Fases entregues e marcos futuros com checklists)
20. License & Acknowledgments (Termos da licença ${config.license}, créditos e chamada para estrelar o repositório)
\`\`\`
`;
}
