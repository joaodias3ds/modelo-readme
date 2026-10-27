import { SnippetBlock } from '../types';

export const MODULAR_SNIPPETS: SnippetBlock[] = [
  {
    id: 'badges-pack',
    title: 'Shields.io Badge Strip',
    category: 'Badges & Hero',
    description: 'High-contrast, for-the-badge style shields for CI, version, license, and community.',
    markdown: `[![Build Status](https://img.shields.io/github/actions/workflow/status/{{GITHUB_USER}}/{{GITHUB_REPO}}/ci.yml?branch=main&style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/{{GITHUB_USER}}/{{GITHUB_REPO}}/actions)
[![Latest Release](https://img.shields.io/github/v/release/{{GITHUB_USER}}/{{GITHUB_REPO}}?style=for-the-badge&logo=semver&logoColor=white&color=blue)](https://github.com/{{GITHUB_USER}}/{{GITHUB_REPO}}/releases)
[![License: {{LICENSE}}](https://img.shields.io/badge/License-{{LICENSE}}-green.svg?style=for-the-badge)](LICENSE)
[![Coverage](https://img.shields.io/codecov/c/github/{{GITHUB_USER}}/{{GITHUB_REPO}}?style=for-the-badge&logo=codecov&logoColor=white)](https://codecov.io/gh/{{GITHUB_USER}}/{{GITHUB_REPO}})
[![Discord](https://img.shields.io/discord/123456789?style=for-the-badge&logo=discord&logoColor=white&color=5865F2)](https://discord.gg/your-server)`,
  },
  {
    id: 'github-stats-pack',
    title: 'GitHub Stats & Streak Widgets',
    category: 'Stats & Social Proof',
    description: 'Dynamic GitHub summary cards showing stars, commits, PRs, streak count, and language share.',
    markdown: `## 📊 GitHub Stats & Metrics

<div align="center">

<a href="https://github.com/{{GITHUB_USER}}">
  <img src="https://github-readme-stats.vercel.app/api?username={{GITHUB_USER}}&show_icons=true&theme=tokyonight&hide_border=false&count_private=true" alt="GitHub Stats" />
</a>

<a href="https://github.com/{{GITHUB_USER}}">
  <img src="https://streak-stats.demolab.com/?user={{GITHUB_USER}}&theme=tokyonight&hide_border=false" alt="GitHub Streak" />
</a>

<a href="https://github.com/{{GITHUB_USER}}">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username={{GITHUB_USER}}&layout=compact&theme=tokyonight&hide_border=false" alt="Top Languages" />
</a>

</div>`,
  },
  {
    id: 'architecture-mermaid',
    title: 'Mermaid Architecture Diagram',
    category: 'Architecture',
    description: 'Clean visual flowchart rendering the system components and data flow.',
    markdown: `\`\`\`mermaid
flowchart TD
    subgraph Clients["Edge & Clients"]
        Web[Web SPA / Mobile App]
        CLI[Terminal CLI Tool]
        SDK[Polyglot SDKs]
    end

    subgraph Ingress["Ingress & Security"]
        Gateway[API Gateway / Envoy]
        Auth[JWT / OAuth Validation]
    end

    subgraph Core["Core Application Services"]
        Worker[Job Worker Pool]
        Engine[Domain Business Engine]
    end

    subgraph Persistence["Storage & Cache"]
        DB[(PostgreSQL Primary)]
        Cache[(Redis Cluster)]
        S3[(Object Storage / S3)]
    end

    Clients --> Gateway
    Gateway --> Auth
    Auth --> Engine
    Engine <--> Cache
    Engine <--> DB
    Engine --> Worker
    Worker --> S3
\`\`\``,
  },
  {
    id: 'conventional-commits',
    title: 'Conventional Commits Specification',
    category: 'Contributing',
    description: 'Clear, standardized table describing commit prefixes and semantic impact.',
    markdown: `### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard. Structure all commit messages as:

\`\`\`text
<type>(<scope>): <short description>

[optional body explaining context or rationale]

[optional footer(s), e.g., Closes #123]
\`\`\`

| Prefix | Semantic Impact | Purpose & Example |
| :--- | :--- | :--- |
| \`feat\` | MINOR (Feature) | Adds a new user-facing functionality (\`feat(auth): add OAuth2 provider\`) |
| \`fix\` | PATCH (Bug Fix) | Fixes a regression or bug (\`fix(cache): prevent TTL race condition\`) |
| \`docs\` | None | Documentation changes only (\`docs: add polyglot installation examples\`) |
| \`refactor\` | None | Code restructuring without behavioral changes (\`refactor: simplify token parser\`) |
| \`perf\` | PATCH (Performance) | Optimizations that improve speed or memory (\`perf: cache regex compilation\`) |
| \`test\` | None | Adding or correcting test suites (\`test: add integration tests for worker pool\`) |
| \`chore\` | None | Routine tooling, dependencies, or metadata changes (\`chore: bump dependencies\`) |`,
  },
  {
    id: 'github-actions-ci',
    title: 'GitHub Actions CI/CD Workflow',
    category: 'CI/CD & DevOps',
    description: 'Full multi-OS testing matrix, linting, and automated code coverage upload.',
    markdown: `### Continuous Integration Workflow

To automate test execution across pull requests, add \`.github/workflows/ci.yml\`:

\`\`\`yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test & Lint
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
    runs-on: \${{ matrix.os }}

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Run Linters & Typecheck
        run: pnpm run lint

      - name: Execute Tests with Coverage
        run: pnpm run test:coverage

      - name: Upload Coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}
\`\`\``,
  },
  {
    id: 'docker-compose',
    title: 'Docker Compose Local Stack',
    category: 'CI/CD & DevOps',
    description: 'Ready-to-run container stack for the service, PostgreSQL, and Redis.',
    markdown: `### Docker Compose Quick Start

To spin up the service alongside its local PostgreSQL database and Redis cache:

\`\`\`yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - APP_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/app
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

Start the entire environment:
\`\`\`bash
docker compose up -d
\`\`\``,
  },
  {
    id: 'security-policy',
    title: 'Responsible Security Disclosure',
    category: 'Security',
    description: 'Professional security policy protecting both users and maintainers.',
    markdown: `## 🔒 Security Policy

We treat security as a first-class engineering priority. We appreciate the responsible disclosure of vulnerabilities.

### Supported Versions

| Version | Supported | Security Updates Until |
| :--- | :---: | :--- |
| **3.x** | ✅ | Active Support |
| **2.x** | ⚠️ | Critical Security Fixes Only |
| **1.x** | ❌ | End of Life (EOL) |

### Reporting a Vulnerability

- **Please do NOT report security vulnerabilities via public GitHub issues.**
- Submit private disclosures through [GitHub Security Advisories](https://github.com/{{GITHUB_USER}}/{{GITHUB_REPO}}/security/advisories/new).
- Alternatively, send an encrypted email to **security@yourdomain.com**.
- We commit to acknowledging receipt within **24 hours** and providing status updates every **48 hours** until resolution.`,
  },
];
