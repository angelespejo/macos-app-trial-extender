import { promptLine } from '@dovenv/core/utils'
import {
	execSync,
	execFile,
} from 'node:child_process'
import { access }    from 'node:fs/promises'
import { promisify } from 'node:util'

import type { AppInfoID } from '../types'

export const validate = <V>( value: V | symbol ) => {

	if ( promptLine.isCancel( value ) ) {

		promptLine.log.message( '' )
		promptLine.cancel( 'Operation cancelled.' )
		process.exit( 0 )

	}
	return value

}

export const getMacosVersion = () => {

	try {

		return execSync( 'sw_vers -productVersion' ).toString().trim()

	}
	catch ( _e ) {

		return undefined

	}

}
export const getAppVersion = async ( appName: AppInfoID ): Promise<string | undefined> => {

	const execFileAsync = promisify( execFile )

	const appPaths: Record<AppInfoID, string> = {
		finalcut : '/Applications/Final Cut Pro Trial.app/Contents/Info.plist',
		logicpro : '/Applications/Logic Pro.app/Contents/Info.plist',
	}

	const plistPath = appPaths[appName]

	try {

		await access( plistPath )

		const { stdout } = await execFileAsync( 'defaults', [
			'read',
			plistPath,
			'CFBundleShortVersionString',
		] )

		return stdout.trim() || undefined

	}
	catch ( _e ) {

		return undefined

	}

}

