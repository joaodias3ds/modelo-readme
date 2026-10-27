export type SupportedLanguage = 
  | 'typescript' 
  | 'python' 
  | 'go' 
  | 'rust' 
  | 'java' 
  | 'csharp' 
  | 'php' 
  | 'docker'
  | 'bash';

export type ProjectCategory = 
  | 'polyglot'
  | 'cli'
  | 'saas'
  | 'library'
  | 'api'
  | 'data-ml';

export type LicenseType = 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'BSD-3-Clause' | 'Unlicense';

export interface EnvVariable {
  key: string;
  type: 'string' | 'number' | 'boolean' | 'url';
  defaultValue: string;
  description: string;
  required: boolean;
}

export interface CliCommand {
  command: string;
  description: string;
  example: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  authRequired: boolean;
  samplePayload?: string;
  sampleResponse?: string;
}

export interface BenchmarkRow {
  stack: string;
  throughput: string;
  latencyP50: string;
  latencyP99: string;
  memory: string;
}

export interface SectionToggles {
  header: boolean;
  tableOfContents: boolean;
  overview: boolean;
  features: boolean;
  architecture: boolean;
  directoryStructure: boolean;
  prerequisites: boolean;
  installation: boolean;
  environmentConfig: boolean;
  quickStart: boolean;
  cliReference: boolean;
  apiReference: boolean;
  testing: boolean;
  deployment: boolean;
  benchmarks: boolean;
  contributing: boolean;
  security: boolean;
  faq: boolean;
  roadmap: boolean;
  license: boolean;
}

export interface ProjectConfig {
  name: string;
  tagline: string;
  description: string;
  githubUser: string;
  githubRepo: string;
  authorName: string;
  authorUrl: string;
  category: ProjectCategory;
  license: LicenseType;
  primaryLanguages: SupportedLanguage[];
  badges: {
    ci: boolean;
    release: boolean;
    license: boolean;
    coverage: boolean;
    docker: boolean;
    discord: boolean;
    npm: boolean;
    pypi: boolean;
  };
  features: string[];
  envVars: EnvVariable[];
  cliCommands: CliCommand[];
  apiEndpoints: ApiEndpoint[];
  benchmarks: BenchmarkRow[];
  sections: SectionToggles;
}

export interface SnippetBlock {
  id: string;
  title: string;
  category: string;
  description: string;
  markdown: string;
}
