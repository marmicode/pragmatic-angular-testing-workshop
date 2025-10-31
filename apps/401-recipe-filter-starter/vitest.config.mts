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
              /* TODO: hoist once this is merged https://github.com/vitest-dev/vitest/pull/8890 */
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
