
import {
	watch,
	watchImmediate,
}              from '@tauri-apps/plugin-fs'

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
	#onChange  : ( event: WatcherEvent ) => void
	on         : ( event: WatcherEvent ) => void

	constructor( paths: string[], args: PathWatcherArgs = {} ) {

		this.#paths     = paths
		this.#onChange  = event => this.on( event )
		this.#watcher   = undefined
		this.#immediate = args.immediate ? args.immediate : false
		this.#recursive = args.recursive == false ? false : true
		this.#preset    = args.preset ? args.preset : false
		this.on         = ( ) => {}

	}

	async start(): Promise<void> {

		const watchFunct = this.#immediate ? watchImmediate : watch

		this.#watcher = await watchFunct(
			this.#paths,
			( event: WatcherEvent ) => {

				if ( this.#preset ) {

					if ( !Array.isArray( event ) ) return

					const e = event[event.length - 1]
					if ( !e.path ) return
					if ( e.path && e.path.endsWith( '.DS_Store' ) ) return
					this.#onChange( e )

				}
				else {

					this.#onChange( event )

				}

			},
			{ recursive: this.#recursive },
		)

	}

	async stop(): Promise<void> {

		if ( this.#watcher ) this.#watcher()

	}

}
