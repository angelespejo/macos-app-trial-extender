import {
	homeDir,
	join,
} from '@tauri-apps/api/path'
import {
	BaseDirectory,
	exists,
	remove as removeFile,
} from '@tauri-apps/plugin-fs'

import { pathWatcher } from './watcher'

export class Path {

	watcher = pathWatcher
	homeDir = homeDir
	join    = join
	exists = exists
	removeFile = removeFile

	async existsHomePath( path: string ) {

		return await exists( path, { baseDir: BaseDirectory.Home } )

	}

	async removeHomeFile( path: string ) {

		await removeFile( path, { baseDir: BaseDirectory.Home } )

	}

}
