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
	{ custom : {
		info : {
			desc : 'Development information',
			fn   : async () => {

				console.log( await md2terminal( './docs/dev-info.md' ) )

			},
		},
		tag : {
			desc : 'Re generate remote tag (information)',
			opts : { name : {
				type    : 'string',
				desc    : 'Tag name',
				default : '1.0.0',
			} },
			fn : async ( { opts } ) => {

				const version = opts?.name || '1.0.0'

				console.log( await md2terminal(
					`# Information to regenerate remote tag
## Delete the local tag
git tag -d ${version}

## Create the tag again at the current commit
git tag ${version}

## Delete the remote tag
git push origin :refs/tags/${version}

## Push the new tag to remote
git push origin ${version}`,
				) )

			},
		},
	} },
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
