/**
 * Types for path watcher.
 *
 * @description Types for path watcher.
 */

export interface PathWatcherArgs {
	immediate? : boolean
	recursive? : boolean
	preset?    : boolean
}

export type WatcherEvent = string | string[] | object
export type Watcher = ( paths: string[], cb: ( e: WatcherEvent ) => void, options?: object ) => void | null
