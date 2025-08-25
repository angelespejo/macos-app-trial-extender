import { i18n }     from './i18n.svelte'
import { settings } from './settings.svelte'

import type { Fs }           from './_super/fs'
import type { Notification } from './_super/notification'
import type { Os }           from './_super/os'

import { DATA } from '$const'

type ResetOpts = {
	fs  : Fs
	not : Notification
	os  : Os
}

export class Reset {

	#opts

	constructor( opts: ResetOpts ) {

		this.#opts = opts

	}

	async #sendNot( {
		type = 'success', app, message,
	}:{
		type?    : 'fail' | 'success'
		app?     : 'logic' | 'fcp'
		message? : string
	} ) {

		if ( !settings.notification.current ) return

		await this.#opts.not.send( {
			title : DATA.PKG.extra.productName + ' (' + DATA.PKG.extra.productNameLong + ')',
			body  : i18n.t( `common.nots.reset.${app || 'general'}.${type}` ) + ( message ? ' ' + message : '' ),

		} )

	}

	async #getHomePaths() {

		const { fs }                    = this.#opts
		const home                      = await fs.homeDir()
		const SUPPORT_PATH_WITHOUT_HOME = {
			GENERAL  : 'Library/Application Support',
			FINALCUT : 'Library/Containers/com.apple.FinalCutTrial/Data/Library/Application Support',
		} as const
		const PATH_NAME                 = {
			LOGIC    : '.lpxuserdata',
			FINALCUT : '.ffuserdata',
		} as const
		const SUPPORT_PATH              = {
			GENERAL  : await fs.join( home, SUPPORT_PATH_WITHOUT_HOME.GENERAL ),
			FINALCUT : await fs.join( home, SUPPORT_PATH_WITHOUT_HOME.FINALCUT ),
		} as const

		const CHECK_PATH_WITHOUT_HOME = {
			logic       : await fs.join( SUPPORT_PATH_WITHOUT_HOME.GENERAL, PATH_NAME.LOGIC ),
			finalcut    : await fs.join( SUPPORT_PATH_WITHOUT_HOME.GENERAL, PATH_NAME.FINALCUT ),
			finalcutNew : await fs.join( SUPPORT_PATH_WITHOUT_HOME.FINALCUT, PATH_NAME.FINALCUT ),
		}
		const CHECK_PATH              = {
			logic       : await fs.join( SUPPORT_PATH.GENERAL, PATH_NAME.LOGIC ),
			finalcut    : await fs.join( SUPPORT_PATH.GENERAL, PATH_NAME.FINALCUT ),
			finalcutNew : await fs.join( SUPPORT_PATH.FINALCUT, PATH_NAME.FINALCUT ),
		}

		return {
			CHECK_PATH,
			PATH_NAME,
			SUPPORT_PATH,
			CHECK_PATH_WITHOUT_HOME,
			SUPPORT_PATH_WITHOUT_HOME,
		}

	}

	#processedPaths = new Set<string>()

	async #resetHomeFile( path: string, type?: 'logic' | 'fcp' | undefined ) {

		try {

			if ( !await this.#opts.fs.exists( path ) ) return undefined
			if ( this.#processedPaths.has( path ) ) return undefined

			this.#processedPaths.add( path )

			console.log( {
				resetHomeFile         : path,
				type,
				currentProcessedPaths : [ ...this.#processedPaths ],
			} )

			await this.#opts.fs.removeFile( path )
			await this.#sendNot( {
				type : 'success',
				app  : type,
			} )
			this.#processedPaths.delete( path )

			return { success: true }

		}
		catch ( _e ) {

			console.warn( 'Using shell', path )

			const executed = await this.#opts.os.executeCommand( 'rm', [ path ] )

			if ( executed.code === 0 ) {

				console.log( { executed } )
				this.#processedPaths.delete( path )
				return { success: true }

			}

			await this.#sendNot( {
				type : 'fail',
				app  : type,
			} )

			console.warn( 'error removing files', _e, { executed } )
			this.#processedPaths.delete( path )
			return { success: false }

		}

	}

	#gettypeNot( key: string ) {

		const type = key.includes( 'finalcut' ) ? 'fcp' : key.includes( 'logic' ) ? 'logic' : undefined
		return type

	}

	isRemoving = $state( false )

	async removeFiles() {

		try {

			this.isRemoving = true
			let isReset     = false

			const { CHECK_PATH } = await this.#getHomePaths()

			for ( const [ key, path ] of Object.entries( CHECK_PATH ) ) {

				const type = this.#gettypeNot( key )
				const res  = await this.#resetHomeFile( path, type )
				if ( res ) isReset = true

			}

			if ( !isReset ) await this.#sendNot( { type: 'success' } )
			this.isRemoving = false

		}
		catch ( _e ) {

			await this.#sendNot( { type: 'fail' } )
			this.isRemoving = false

		}

	}

	async init() {

		const {
			SUPPORT_PATH_WITHOUT_HOME,
			CHECK_PATH,
		} = await this.#getHomePaths()

		const watcher = this.#opts.fs.watcher( Object.values( SUPPORT_PATH_WITHOUT_HOME ), {
			preset    : true,
			baseDir   : this.#opts.fs.baseDir.Home,
			recursive : false,
		} )

		watcher.on = async e => {

			// @ts-ignore
			const paths = e.paths as string[]

			const mached = Object.entries( CHECK_PATH ).find( ( [ _k, value ] ) => paths.includes( value ) )

			if ( mached ) {

				const machedKey   = this.#gettypeNot( mached[0] )
				const matchedPath = mached[1]
				console.log( {
					watcherEvent : e,
					paths,
					matchedPath,
				} )
				await this.#resetHomeFile( matchedPath, machedKey )

				// console.log( e, matchedPath )

			}

		}
		const runWatcher = async ( value: boolean ) => {

			console.log( { runWatcher: value } )
			if ( value === true ) {

				await this.removeFiles()
				await watcher.start()
				console.log( 'watcher started' )

			}
			else {

				await watcher.stop()
				console.log( 'watcher stopped' )

			}

		}

		$effect.root( () => {

			$effect( () => {

				runWatcher( settings.automate.current )

			} )

		} )

	}

}
