import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['{apps,libs,tools}/**/vitest.config.{mjs,js,ts,mts}'],
  },
});
