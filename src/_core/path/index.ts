import { homeDir }       from '@tauri-apps/api/path'
import {
	BaseDirectory,
	exists,
	remove as removeFile,
} from '@tauri-apps/plugin-fs'

import { pathWatcher } from './watcher'

export class Path {

	watcher = pathWatcher
	homeDir = homeDir
	async existsHomePath( path: string ) {

		return await exists( path, { baseDir: BaseDirectory.Home } )

	}

	async removeHomeFile( path: string ) {

		await removeFile( path, { baseDir: BaseDirectory.Home } )

	}

	async appSupport( path: string = '' ) {

		const homeDir = await this.homeDir()
		if ( path !== '' ) return homeDir + 'Library/Application Support/' + path
		return homeDir + 'Library/Application Support'

	}

}
