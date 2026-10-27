import { SupportedLanguage } from '../types';

export interface LanguageMeta {
  id: SupportedLanguage;
  name: string;
  badgeColor: string;
  extension: string;
  packageManagers: {
    name: string;
    command: string;
    recommended?: boolean;
  }[];
  quickStartCode: string;
  testCommand: string;
  lintCommand: string;
}

export const LANGUAGE_REGISTRY: Record<SupportedLanguage, LanguageMeta> = {
  typescript: {
    id: 'typescript',
    name: 'TypeScript / Node.js',
    badgeColor: '3178C6',
    extension: 'ts',
    packageManagers: [
      { name: 'npm', command: 'npm install {{PACKAGE_NAME}}' },
      { name: 'pnpm', command: 'pnpm add {{PACKAGE_NAME}}', recommended: true },
      { name: 'yarn', command: 'yarn add {{PACKAGE_NAME}}' },
      { name: 'bun', command: 'bun add {{PACKAGE_NAME}}' },
    ],
    quickStartCode: `import { Client, Configuration } from '{{PACKAGE_NAME}}';

// 1. Initialize client with environment variables
const client = new Client(
  new Configuration({
    apiKey: process.env.API_SECRET_KEY,
    timeoutMs: 5000,
  })
);

// 2. Perform operation
async function main() {
  try {
    const response = await client.execute({
      taskId: 'task_01j7x9k',
      payload: { mode: 'batch', priority: 'high' },
    });

    console.log('Execution successful:', response.id, response.status);
  } catch (error) {
    console.error('Operation failed:', error);
    process.exit(1);
  }
}

main();`,
    testCommand: 'pnpm test --coverage',
    lintCommand: 'pnpm run lint',
  },

  python: {
    id: 'python',
    name: 'Python',
    badgeColor: '3776AB',
    extension: 'py',
    packageManagers: [
      { name: 'pip', command: 'pip install {{PACKAGE_NAME}}' },
      { name: 'poetry', command: 'poetry add {{PACKAGE_NAME}}' },
      { name: 'uv', command: 'uv add {{PACKAGE_NAME}}', recommended: true },
    ],
    quickStartCode: `import os
from {{PACKAGE_NAME_SNAKE}} import Client, Config

# 1. Initialize client
client = Client(
    config=Config(
        api_key=os.getenv("API_SECRET_KEY"),
        timeout_seconds=5.0
    )
)

# 2. Execute task
def run():
    try:
        response = client.execute(
            task_id="task_01j7x9k",
            payload={"mode": "batch", "priority": "high"}
        )
        print(f"Execution successful: {response.id} | Status: {response.status}")
    except Exception as exc:
        print(f"Operation error: {exc}")
        raise

if __name__ == "__main__":
    run()`,
    testCommand: 'pytest --cov=src tests/',
    lintCommand: 'ruff check . && mypy src/',
  },

  go: {
    id: 'go',
    name: 'Go (Golang)',
    badgeColor: '00ADD8',
    extension: 'go',
    packageManagers: [
      { name: 'go get', command: 'go get github.com/{{GITHUB_USER}}/{{GITHUB_REPO}}', recommended: true },
    ],
    quickStartCode: `package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/{{GITHUB_USER}}/{{GITHUB_REPO}}/pkg/client"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 1. Initialize client
	c, err := client.New(client.Config{
		APIKey: os.Getenv("API_SECRET_KEY"),
	})
	if err != nil {
		log.Fatalf("Failed to initialize client: %v", err)
	}

	// 2. Execute task
	res, err := c.Execute(ctx, client.ExecuteInput{
		TaskID:  "task_01j7x9k",
		Payload: map[string]any{"mode": "batch", "priority": "high"},
	})
	if err != nil {
		log.Fatalf("Execution failed: %v", err)
	}

	fmt.Printf("Execution successful: %s | Status: %s\\n", res.ID, res.Status)
}`,
    testCommand: 'go test -v -race -cover ./...',
    lintCommand: 'golangci-lint run',
  },

  rust: {
    id: 'rust',
    name: 'Rust',
    badgeColor: '000000',
    extension: 'rs',
    packageManagers: [
      { name: 'cargo', command: 'cargo add {{PACKAGE_NAME}}', recommended: true },
    ],
    quickStartCode: `use {{PACKAGE_NAME_SNAKE}}::{Client, Config, ExecuteRequest};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Initialize client
    let client = Client::new(Config {
        api_key: env::var("API_SECRET_KEY")?,
        timeout_ms: 5000,
    })?;

    // 2. Execute task
    let response = client
        .execute(ExecuteRequest {
            task_id: "task_01j7x9k".to_string(),
            priority: "high".to_string(),
        })
        .await?;

    println!("Execution successful: {} | Status: {}", response.id, response.status);
    Ok(())
}`,
    testCommand: 'cargo test --all-features',
    lintCommand: 'cargo clippy -- -D warnings && cargo fmt --check',
  },

  java: {
    id: 'java',
    name: 'Java / Kotlin',
    badgeColor: 'ED8B00',
    extension: 'java',
    packageManagers: [
      { name: 'Maven', command: `<dependency>
  <groupId>com.{{GITHUB_USER}}</groupId>
  <artifactId>{{GITHUB_REPO}}</artifactId>
  <version>1.0.0</version>
</dependency>` },
      { name: 'Gradle', command: `implementation 'com.{{GITHUB_USER}}:{{GITHUB_REPO}}:1.0.0'`, recommended: true },
    ],
    quickStartCode: `import com.{{GITHUB_USER}}.{{GITHUB_REPO}}.Client;
import com.{{GITHUB_USER}}.{{GITHUB_REPO}}.Config;
import com.{{GITHUB_USER}}.{{GITHUB_REPO}}.models.ExecuteResponse;

public class Main {
    public static void main(String[] args) {
        // 1. Initialize client
        Client client = new Client(Config.builder()
            .apiKey(System.getenv("API_SECRET_KEY"))
            .timeoutMillis(5000)
            .build());

        // 2. Execute task
        try {
            ExecuteResponse response = client.execute("task_01j7x9k", "high");
            System.out.println("Execution success: " + response.getStatus());
        } catch (Exception e) {
            System.err.println("Execution failed: " + e.getMessage());
        }
    }
}`,
    testCommand: './gradlew test jacocoTestReport',
    lintCommand: './gradlew checkstyleMain spotbugsMain',
  },

  csharp: {
    id: 'csharp',
    name: 'C# / .NET',
    badgeColor: '512BD4',
    extension: 'cs',
    packageManagers: [
      { name: 'dotnet', command: 'dotnet add package {{PACKAGE_NAME}}', recommended: true },
    ],
    quickStartCode: `using System;
using System.Threading.Tasks;
using {{PACKAGE_NAME}};

class Program
{
    static async Task Main(string[] args)
    {
        // 1. Initialize client
        using var client = new ServiceClient(new ClientOptions
        {
            ApiKey = Environment.GetEnvironmentVariable("API_SECRET_KEY") ?? "",
            Timeout = TimeSpan.FromSeconds(5)
        });

        // 2. Execute task
        var result = await client.ExecuteAsync(new ExecuteRequest
        {
            TaskId = "task_01j7x9k",
            Priority = PriorityLevel.High
        });

        Console.WriteLine($"Result: {result.Id} - Status: {result.Status}");
    }
}`,
    testCommand: 'dotnet test /p:CollectCoverage=true',
    lintCommand: 'dotnet format --verify-no-changes',
  },

  php: {
    id: 'php',
    name: 'PHP',
    badgeColor: '777BB4',
    extension: 'php',
    packageManagers: [
      { name: 'Composer', command: 'composer require {{GITHUB_USER}}/{{GITHUB_REPO}}', recommended: true },
    ],
    quickStartCode: `<?php

require_once __DIR__ . '/vendor/autoload.php';

use {{GITHUB_USER}}\\{{GITHUB_REPO}}\\Client;
use {{GITHUB_USER}}\\{{GITHUB_REPO}}\\Config;

// 1. Initialize client
$client = new Client(new Config(
    apiKey: getenv('API_SECRET_KEY'),
    timeoutSeconds: 5
));

// 2. Execute task
try {
    $response = $client->execute([
        'taskId' => 'task_01j7x9k',
        'priority' => 'high'
    ]);
    echo "Status: " . $response->status . PHP_EOL;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . PHP_EOL;
}`,
    testCommand: 'vendor/bin/pest --coverage',
    lintCommand: 'vendor/bin/phpstan analyse -l 8 src/',
  },

  docker: {
    id: 'docker',
    name: 'Docker / OCI',
    badgeColor: '2496ED',
    extension: 'dockerfile',
    packageManagers: [
      { name: 'docker pull', command: 'docker pull ghcr.io/{{GITHUB_USER}}/{{GITHUB_REPO}}:latest', recommended: true },
    ],
    quickStartCode: `# Run interactive container
docker run -d \\
  --name {{GITHUB_REPO}} \\
  -p 8080:8080 \\
  -e API_SECRET_KEY="your-secret-key" \\
  -e APP_ENV="production" \\
  ghcr.io/{{GITHUB_USER}}/{{GITHUB_REPO}}:latest`,
    testCommand: 'docker build --target test -t {{GITHUB_REPO}}:test .',
    lintCommand: 'hadolint Dockerfile',
  },

  bash: {
    id: 'bash',
    name: 'CLI / Shell',
    badgeColor: '4EAA25',
    extension: 'sh',
    packageManagers: [
      { name: 'curl one-liner', command: 'curl -fsSL https://get.yourproject.dev | bash', recommended: true },
      { name: 'Homebrew', command: 'brew install {{GITHUB_USER}}/tap/{{GITHUB_REPO}}' },
    ],
    quickStartCode: `# Verify installation
{{GITHUB_REPO}} --version

# Run command with parameters
{{GITHUB_REPO}} execute --id="task_01j7x9k" --priority=high --verbose

# Run as background daemon
{{GITHUB_REPO}} daemon start --config=./config.yaml`,
    testCommand: 'bats test/',
    lintCommand: 'shellcheck scripts/*.sh',
  },
};
