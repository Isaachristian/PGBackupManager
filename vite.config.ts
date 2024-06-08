import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
// import * as fs from 'node:fs
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
	plugins: [sveltekit(), mkcert()],
	server: {
		proxy: {}
		// https: {
		// 	key: fs.readFileSync('./cert/server.key'),
		// 	cert: fs.readFileSync('./cert/server.crt')
		// }
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
