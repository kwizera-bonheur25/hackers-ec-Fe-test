import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['test/setupTest.ts'],
		coverage: {
			reporter: ['text', 'html', 'lcov', 'json-summary', 'text-summary'],
			exclude: [
				'node_modules/',
				'.eslintrc.cjs',
				'coverage',
				'postcss.config.js',
				'tailwind.config.js ',
				'src/redux',
				'src/main.tsx',
				'src/utils/variants.ts',
				'src/utils/MockNavigate.ts',
			],
		},
	},
});
