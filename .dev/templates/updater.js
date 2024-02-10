/**
 * Updater.
 *
 * @description Todo.
 * @see https://tauri.app/v1/guides/distribution/updater/#update-file-json-format
 */

import {
	getCurrentDateTime, 
	pkg, 
} from '../_core.js'

const name    = pkg.data.extra.productName
const version = pkg.data.version
const repo    = pkg.data.repository

export const updater = ( { signIntel, signArm, note } ) =>`{
	"version": "${version}",
	"notes": "${note}",
	"pub_date": "${getCurrentDateTime()}",
	"platforms": {
		"darwin-x86_64": {
			"signature": "${signIntel}",
			"url": "${repo}/releases/download/${version}/${name}-x86_64.app.tar.gz"
		},
		"darwin-aarch64": {
			"signature": "${signArm}",
			"url": "${repo}/download/${version}/${name}-aarch64.app.tar.gz"
		}
	}
}`
