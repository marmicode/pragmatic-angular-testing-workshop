import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import vitestAngularPreset from './vitest-angular-preset';

const testPatterns = ['src/**/*.spec.ts'];
const browserTestPatterns = ['src/**/*.browser.spec.ts'];

export default mergeConfig(
  mergeConfig(viteConfig, vitestAngularPreset),
  defineConfig({
    test: {
      globals: true,
      setupFiles: ['src/test-setup.ts'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/whiskmate',
        provider: 'v8',
      },
      watch: false,
      pool: 'threads',
      isolate: false,
      /**
       * @todo remove `maxWorkers` once no-isolate parallelism is supported.
       * @see https://github.com/vitest-dev/vitest/issues/8919
       */
      maxWorkers: 1,
      projects: [
        {
          extends: true,
          test: {
            name: 'emulated',
            environment: 'jsdom',
            include: testPatterns,
            exclude: browserTestPatterns,
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: browserTestPatterns,
            browser: {
              enabled: true,
              /**
               * @todo hoist once browser.isolate and isolate are merged
               * @see https://github.com/vitest-dev/vitest/pull/8890
               */
              isolate: false,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  }),
);
