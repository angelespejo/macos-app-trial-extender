/**
 * Todo.
 *
 * @description Todo.
 */
import {
	BaseDirectory,
	exists,
	removeFile,
} from '@tauri-apps/api/fs'
import { homeDir } from '@tauri-apps/api/path'

import { pathWatcher } from './watcher'

export class Path {

	watcher = pathWatcher
	homeDir = homeDir
	async existsHomePath( path: string ) {

		return await exists( path, { dir: BaseDirectory.Home } )

	}

	async removeHomeFile( path: string ) {

		await removeFile( path, { dir: BaseDirectory.Home } )

	}

	async appSupport( path: string = '' ) {

		const homeDir = await this.homeDir()
		if ( path !== '' ) return homeDir + 'Library/Application Support/' + path
		return homeDir + 'Library/Application Support'

	}

}
