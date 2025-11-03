import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    /**
     * @todo add apps/* later
     * Right now, we hit memory limits.
     */
    projects: ['{libs,tools}/**/vitest.config.{mjs,js,ts,mts}'],
  },
});
