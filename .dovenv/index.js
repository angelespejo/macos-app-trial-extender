import { defineConfig }       from '@dovenv/core'
import { md2terminal }        from '@dovenv/core/utils'
import lintPlugin             from '@dovenv/lint'
import { contributorsPlugin } from '@dovenv/repo'

import {
	role,
	member,
} from './contributors.js'
import gitConfig    from './git.js'
import readmeConfig from './readme.js'

export default defineConfig( [
	{ custom : { info : {
		desc : 'Development information',
		fn   : async () => {

			console.log( await md2terminal( './docs/dev-info.md' ) )

		},
	} } },
	lintPlugin( { staged : {
		'*.{js,cjs,mjs,ts,cts,mts,yaml,toml,json,css,html,md,svelte}' : 'eslint',
		'*.rs'                                                        : 'cargo fmt --manifest-path ./src-tauri/Cargo.toml',
	} } ),
	readmeConfig,
	contributorsPlugin( {
		role,
		member : Object.values( member ),
	} ),
	gitConfig,
] )
