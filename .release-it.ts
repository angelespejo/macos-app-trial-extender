/**
 * Release-it config builder.
 *
 * @description Configuration for release versions in github.
 * @see https://github.com/release-it/release-it/blob/main/docs/configuration.md
 */

import pkg from './package.json' with { type: 'json' }

import type { Config } from 'release-it'

const topics = pkg.keywords.join( ',' )
const gitUrl = pkg.repository.url
const name   = pkg.name
const desc   = pkg.description
const ver    = 'v${version}'

if ( !pkg.devDependencies['auto-changelog'] ) throw new Error( 'auto-changelog must be installed. Run `pnpm add -D auto-changelog' )
if ( !pkg.devDependencies['@release-it/bumper'] ) throw new Error( '@release-it/bumper must be installed. Run `pnpm add -D @release-it/bumper' )

export default {

	plugins : { '@release-it/bumper' : { out : {
		file : 'src-tauri/tauri.conf.json',
		path : 'package.version',
	} } },
	git : {
		requireBranch : 'main',
		commitMessage : `:bookmark: feat(all): Release ${ver}`,
	},
	hooks : {
		'before:init'       : [ 'git push', 'pnpm lint:fix' ],
		'after:bump'        : [ 'pnpm auto-changelog -p', 'pnpm readme' ],
		'after:git:release' : 'echo \'After git push, before github release\'',
		'after:release'     : [
			`gh repo edit ${gitUrl} -d "${desc}"`,
			`gh repo edit ${gitUrl} --add-topic ${topics}`,
			`echo 'Github action is now releasing: ${name} ${ver} to ${gitUrl}.\n Check if all is ok 🌈🤖\n ${gitUrl}/actions'`,
		],
	},

	github : { release: false },
	npm    : { publish: false },
} satisfies Config
