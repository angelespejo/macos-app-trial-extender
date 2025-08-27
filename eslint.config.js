import {
	setConfig,
	setSvelteConfig,
} from '@dovenv/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig(
	setConfig( {
		general   : 'ts',
		jsdoc     : true,
		gitignore : true,
		package   : true,
		json      : true,
		// css       : {
		// 	tailwind : 4,
		// 	postcss  : true,
		// 	rules    : { 'css/use-baseline': 'off' },
		// },
		css       : false,
		html      : true,
		toml      : true,
		md        : true,
		ignore    : [
			'**/README.md',
			'**/CHANGELOG.md',
			'docs/dev-info.md',
			'src/i18n/**',
			'src-tauri/gen/**/*.json',
		],

	} ),
	await setSvelteConfig( { ts: true } ),
	{
		files : [ 'src/core/_super/**' ],
		rules : { 'no-restricted-imports' : [
			'error',
			{ patterns : [
				{
					group : [
						'../**', // bloquea subir directorios
						'!../_shared', // permite el entrypoint
						'!../_shared/**', // permite todo dentro de _shared
						'!../_shared/*.svelte',
					],
					message : 'Usage of "../" private modules not allowed. Use "$core" instead',
				},
			] },
		] },
	},
)

