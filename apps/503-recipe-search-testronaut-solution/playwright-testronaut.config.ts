import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
import { withTestronautAngular } from '@testronaut/angular';
import { sep } from 'node:path';

const projectName = __dirname.split(sep).pop();
const timeout = 5_000;

export default defineConfig(
  nxE2EPreset(__filename),
  withTestronautAngular({
    configPath: __filename,
    testServer: {
      command: `pnpm exec nx serve ${projectName} --configuration testronaut --port {port}`,
    },
  }),
  {
    timeout,
    expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      actionTimeout: timeout,
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
    },
    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
  },
);
