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
		css       : {
			tailwind : 3,
			postcss  : true,
			rules    : { 'css/use-baseline': 'off' },
		},
		html   : true,
		toml   : true,
		md     : true,
		ignore : [
			'**/README.md',
			'**/CHANGELOG.md',
			'docs/dev-info.md',
			'src-tauri/gen/**/*.json',
		],

	} ),
	await setSvelteConfig( { ts: true } ),
)
