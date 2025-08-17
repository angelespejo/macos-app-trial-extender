
import {
	watch,
	watchImmediate,
} from '@tauri-apps/plugin-fs'

import type {
	PathWatcherArgs,
	WatcherEvent,
} from './types'

export const pathWatcher = ( paths: string[], args: PathWatcherArgs = {} ) => new PathWatcher( paths, args )

export class PathWatcher {

	#paths     : string[]
	#watcher   : undefined | Awaited<ReturnType<typeof watch>> | Awaited<ReturnType<typeof watchImmediate>>
	#immediate : boolean
	#recursive : boolean
	#preset    : boolean
	on         : ( event: WatcherEvent ) => void
	#baseDir
	constructor( paths: string[], args: PathWatcherArgs = {} ) {

		this.#paths     = paths
		this.#watcher   = undefined
		this.#immediate = args.immediate ? args.immediate : false
		this.#recursive = args.recursive == false ? false : true
		this.#preset    = args.preset ? args.preset : false
		this.#baseDir   = args.baseDir
		this.on         = ( ) => {}

	}

	async start(): Promise<void> {

		const watchFunct = this.#immediate ? watchImmediate : watch

		this.#watcher = await watchFunct(
			this.#paths,
			event => {

				if ( this.#preset ) {

					const e =  !Array.isArray( event ) ? event : event[event.length - 1]

					if ( !e.paths ) return

					this.on( event )

				}
				else {

					this.on( event )

				}

			},
			{
				recursive : this.#recursive,
				baseDir   : this.#baseDir,
			},
		)

	}

	async stop(): Promise<void> {

		if ( this.#watcher ) this.#watcher()

	}

}
