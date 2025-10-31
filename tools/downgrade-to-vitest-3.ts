import { workspaceRoot } from '@nx/devkit';
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path/posix';

const VITEST_PACKAGES = ['vitest', '@vitest/ui', '@vitest/coverage-v8'];
const VITEST_3_VERSION = '3.2.4';
const VITEST_3_PACKAGE_REPLACEMENTS = {
  '@vitest/browser-playwright': '@vitest/browser',
};

main();

function main() {
  console.log('Downgrading to Vitest 3...');

  // Update package.json
  const packageJsonPath = join(workspaceRoot, 'package.json');
  _updateJson(packageJsonPath, _downgradePackageJsonUpdater);
  console.log('✅ Updated package.json');

  // Run pnpm install
  console.log('Running pnpm install...');
  execSync('pnpm install', { stdio: 'inherit', cwd: workspaceRoot });
  console.log('✅ Installed dependencies');

  const vitestConfigFiles = _findVitestConfigFiles(workspaceRoot);

  for (const configPath of vitestConfigFiles) {
    _updateVitestConfig(configPath);
  }
  console.log('✅ Updated vitest config files');
  console.log('✅ Done!');
}

function _findVitestConfigFiles(dir: string): string[] {
  const results: string[] = [];
  walk(dir);
  return results;

  function walk(currentDir: string) {
    const entries = readdirSync(currentDir);

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);

      /* Skip node_modules */
      if (entry === 'node_modules') {
        continue;
      }

      /* Check if it's a vitest.config.mts file */
      if (entry === 'vitest.config.mts') {
        results.push(fullPath);
        continue;
      }

      /* Recurse into directories */
      try {
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          walk(fullPath);
        }
      } catch {
        /* Skip files we can't stat */
        console.warn(`  Skipping ${fullPath} because we can't stat it`);
      }
    }
  }
}

function _updateJson(filePath: string, updaterFn: (json: any) => any) {
  const jsonContent = JSON.parse(readFileSync(filePath, 'utf-8'));
  const updatedJson = updaterFn(jsonContent);
  writeFileSync(filePath, JSON.stringify(updatedJson, null, 2) + '\n');
}

function _downgradePackageJsonUpdater(packageJson: any) {
  const devDeps = packageJson.devDependencies || {};

  /* Update existing vitest packages to v3. */
  for (const pkg of VITEST_PACKAGES) {
    if (devDeps[pkg]) {
      devDeps[pkg] = VITEST_3_VERSION;
    }
  }

  /* Replace packages that changed names between v3 and v4. */
  for (const [oldPkg, newPkg] of Object.entries(
    VITEST_3_PACKAGE_REPLACEMENTS,
  )) {
    if (devDeps[oldPkg]) {
      delete devDeps[oldPkg];
      devDeps[newPkg] = VITEST_3_VERSION;
    }
  }

  return {
    ...packageJson,
    devDependencies: devDeps,
  };
}

function _updateVitestConfig(configPath: string) {
  let content = readFileSync(configPath, 'utf-8');

  /* In Vitest 3, the browser provider package changed from @vitest/browser-playwright to @vitest/browser. */
  if (
    content.includes("import { playwright } from '@vitest/browser-playwright'")
  ) {
    content = content.replace(
      /import { playwright } from '@vitest\/browser-playwright';\n/,
      '',
    );
  }

  /* In Vitest 3, browser.instances was browser.name */
  if (content.includes('instances: [{ browser:')) {
    content = content.replace(
      /instances: \[{ browser: '(\w+)' }\]/g,
      "name: '$1'",
    );
  }

  /* Remove provider call syntax - in v3 it was a plain object */
  content = content.replace(
    /provider: playwright\(\)/g,
    "provider: 'playwright'",
  );

  writeFileSync(configPath, content);
  console.log(`✅ Updated ${configPath}`);
}
