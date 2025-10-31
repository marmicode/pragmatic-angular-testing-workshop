import analog from '@analogjs/vite-plugin-angular';
import { defineConfig, Plugin } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/tests/whiskmate',
  plugins: [applyAnalogWorkaround(analog({ jit: false }))],
});

/**
 * Disable angularVitestPlugin because it includes @angular/cdk and its side-effect
 * is that we end up with two instances of the module. This can cause the following error
 * when using Angular CDK Harnesses:
 *   SyntaxError: '' is not a valid selector
 *
 * The common problem is that `@angular/material` is using `@angular/cdk` internally
 * and end up with a different reference to `HarnessPredicate` and `instanceof` check fails.
 *
 * Another workaround is to inline `@angular/material` but the side effect is that
 * it makes vitest load and transform more code, thus slowing down the tests.
 *
 * We also don't need to downlevel `async/await` because our tests are zoneless.
 *
 * @see https://github.com/analogjs/analog/issues/1891
 */
function applyAnalogWorkaround(plugins: Plugin[]): Plugin[] {
  return plugins.map((plugin) => {
    if (plugin.name === '@analogjs/vitest-angular-esm-plugin') {
      return {
        name: plugin.name,
        apply: plugin.apply,
        enforce: plugin.enforce,
        config: () => ({ optimizeDeps: { include: ['tslib'] } }),
      };
    }
    return plugin;
  });
}
