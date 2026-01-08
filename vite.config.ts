import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SolidChartJS',
      fileName: 'solid-chart',
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      // make sure to externalise deps
      // that shouldn't be bundled into thw library
      external: [
        'chart.js',
        'solid-js',
        'solid-js/web',
        'solid-js/store',
        '@solid-primitives/refs',
      ],
    },
  },
  plugins: [
    solidPlugin(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
      insertTypesEntry: true,
    }),
  ],
});
