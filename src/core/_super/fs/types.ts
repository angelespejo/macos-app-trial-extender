/**
 * Types for path watcher.
 *
 * @description Types for path watcher.
 */

import type { BaseDirectory } from '@tauri-apps/plugin-fs'

export interface PathWatcherArgs {
	immediate? : boolean
	recursive? : boolean
	preset?    : boolean
	baseDir?   : BaseDirectory
}

export type WatcherEvent = string | string[] | object
export type Watcher = ( paths: string[], cb: ( e: WatcherEvent ) => void, options?: object ) => void | null
