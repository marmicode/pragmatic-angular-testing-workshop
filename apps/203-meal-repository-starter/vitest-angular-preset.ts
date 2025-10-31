import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({
    define: {
      /* When debugging in the browser, we want to prevent TestBed from cleaning up after
       * the test and we don't want Angular Testing Library to interfere. */
      'process.env.ATL_SKIP_AUTO_CLEANUP': 'true',
    },
  }),
  defineConfig(
    process.env.DEBUG_BROWSER != null
      ? {
          /* When debugging in the browser, we want to prevent TestBed from cleaning up after
           * the test in order to interact with the browser.
           * Therefore, we forward the DEBUG_BROWSER environment variable to move TestBed cleanup
           * from afterEach to beforeEach. */
          define: { DEBUG_BROWSER: true },
          test: { fileParallelism: false },
        }
      : {},
  ),
);
