/**
 * Release-it config builder.
 *
 * @description Configuration for release versions in github.
 * @see https://github.com/release-it/release-it/blob/main/docs/configuration.md
 */

import { pkg } from '../_core.js'

const topics = pkg.data.keywords.join( ',' )
const gitUrl = pkg.data.repository.url
const name   = pkg.data.name
const desc   = pkg.data.description
const ver    = 'v${version}'

const data = {
	'plugins' : {
		'@release-it/bumper' : {
			// 'in' : [
			// 	'src-tauri/tauri.conf.json',
			// ],
			'out' : {
				'file' : 'src-tauri/tauri.conf.json',
				'path' : 'package.version',
			},
		},
	},
	'git' : {
		'requireBranch' : 'main',
		'commitMessage' : `:bookmark: feat(all): Release ${ver}`,
	},
	'hooks' : {
		'before:init' : [
			'git push', 
			'pnpm lint:fix', 
		],
		'after:bump' : [
			'pnpm auto-changelog -p',
		],
		'after:git:release' : 'echo \'After git push, before github release\'',
		'after:release'     : [
			`gh repo edit ${gitUrl} -d "${desc}"`,
			`gh repo edit ${gitUrl} --add-topic ${topics}`,
			`echo 'Github action is now releasing: ${name} ${ver} to ${gitUrl}.\n Check if all is ok 🌈🤖\n ${gitUrl}/actions'`,
		],
	},
	'github' : {
		'release' : false,
	},
	'npm' : {
		'release' : false,
	},
}

export const releaseIt = JSON.stringify( data, null, 4 )
