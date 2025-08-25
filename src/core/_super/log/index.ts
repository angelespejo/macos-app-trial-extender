import {
	attachConsole,
	warn,
	debug,
	trace,
	info,
	error,
	type LogOptions as TauriLogOptions,
} from '@tauri-apps/plugin-log'

const LOG_TYPES = {
	LOG   : 'log',
	DEBUG : 'debug',
	INFO  : 'info',
	WARN  : 'warn',
	ERROR : 'error',
	TABLE : 'table',
} as const

type LogType = typeof LOG_TYPES[keyof typeof LOG_TYPES]
type LogOptions = {
	forwardConsole? : boolean | LogType[]
	options?        : TauriLogOptions
}

export class Log {

	warn = warn
	debug = debug
	trace = trace
	info = info
	error = error

	constructor( opts: LogOptions = {} ) {

		if ( opts.forwardConsole ) {

			if ( typeof opts.forwardConsole === 'boolean' )
				for ( const type of Object.values( LOG_TYPES ) ) this.#forwardConsole2Tauri( type, opts.options )

			if ( Array.isArray( opts.forwardConsole ) )
				for ( const type of opts.forwardConsole ) this.#forwardConsole2Tauri( type, opts.options )

		}

	}

	#forwardConsole2Tauri( type: LogType, opts?: TauriLogOptions ) {

		if ( type === 'log' ) return this.forwardConsole( type, v => trace( v, opts ) )
		if ( type === 'debug' ) return this.forwardConsole( type, v => debug( v, opts ) )
		if ( type === 'info' ) return this.forwardConsole( type, v => info( v, opts ) )
		if ( type === 'warn' ) return this.forwardConsole( type, v => warn( v, opts ) )
		if ( type === 'error' ) return this.forwardConsole( type, v => error( v, opts ) )
		if ( type === 'table' ) return this.forwardConsole( type, v => trace( JSON.stringify( v, null, 2 ), opts ) )

	}

	forwardConsole(
		fnName: LogType,
		logger: ( message: string ) => Promise<void>,
	) {

		const original  = console[fnName]
		console[fnName] = ( ...args ) => {

			original( ...args )

			const stringified = args
				.map( arg =>
					typeof arg === 'string'
						? arg
						: ( () => {

							try {

								return JSON.stringify( arg, null, 2 )

							}
							catch {

								return String( arg )

							}

						} )(),
				)
				.join( ' ' )

			logger( stringified || '' )

		}

	}

	/**
	 * Attach the nodejs console to the tauri console.
	 *
	 * @returns {Promise<{ detach: () => Promise<void> }>} an object with a single method detach, which can be used to detach the console.
	 */
	async atach() {

		const detach = await attachConsole()

		window?.addEventListener( 'unload', () => detach() )

		return { detach }

	}

}
