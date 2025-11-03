import angular from '@analogjs/vite-plugin-angular';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/testing',
  plugins: [
    angular({ jit: false, tsconfig: './tsconfig.spec.json' }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
});
