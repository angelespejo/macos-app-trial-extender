import { BaseDirectory } from '@tauri-apps/plugin-fs'
import { Command }       from '@tauri-apps/plugin-shell'

import type { Notification } from '$core/notification'
import type { store }        from '$core/store'
import type { Path }         from '../path'

import { PACKAGE_DATA } from '$const'
import { t }            from '$core/i18n'

type ResetOpts = {
	path  : Path
	store : typeof store
	not   : Notification
}

export class Reset {

	#opts

	async #sendNot( {
		type = 'success', app, message,
	}:{
		type?    : 'fail' | 'success'
		app?     : 'logic' | 'fcp'
		message? : string
	} ) {

		if ( !this.#opts.store.get( this.#opts.store.notification ) ) return
		const $t = this.#opts.store.get( t )
		await this.#opts.not.send( {
			title : PACKAGE_DATA.extra.productName + ' (' + PACKAGE_DATA.extra.productNameLong + ')',
			body  : $t( `common.nots.reset.${app || 'general'}.${type}` ) + ( message ? ' ' + message : '' ),

		} )

	}

	constructor( opts: ResetOpts ) {

		this.#opts = opts

	}

	async #getHomePaths() {

		const { path }                  = this.#opts
		const home                      = await path.homeDir()
		const SUPPORT_PATH_WITHOUT_HOME = {
			GENERAL  : 'Library/Application Support',
			FINALCUT : 'Library/Containers/com.apple.FinalCutTrial/Data/Library/Application Support',
		} as const
		const SUPPORT_PATH              = {
			GENERAL  : await path.join( home, SUPPORT_PATH_WITHOUT_HOME.GENERAL ),
			FINALCUT : await path.join( home, SUPPORT_PATH_WITHOUT_HOME.FINALCUT ),
		} as const

		const PATH_NAME               = {
			LOGIC    : '.lpxuserdata',
			FINALCUT : '.ffuserdata',
		} as const
		const CHECK_PATH_WITHOUT_HOME = {
			logic       : await path.join( SUPPORT_PATH_WITHOUT_HOME.GENERAL, PATH_NAME.LOGIC ),
			finalcut    : await path.join( SUPPORT_PATH_WITHOUT_HOME.GENERAL, PATH_NAME.FINALCUT ),
			finalcutNew : await path.join( SUPPORT_PATH_WITHOUT_HOME.FINALCUT, PATH_NAME.FINALCUT ),
		}
		const CHECK_PATH              = {
			logic       : await path.join( SUPPORT_PATH.GENERAL, PATH_NAME.LOGIC ),
			finalcut    : await path.join( SUPPORT_PATH.GENERAL, PATH_NAME.FINALCUT ),
			finalcutNew : await path.join( SUPPORT_PATH.FINALCUT, PATH_NAME.FINALCUT ),
		}

		return {
			CHECK_PATH,
			PATH_NAME,
			SUPPORT_PATH,
			CHECK_PATH_WITHOUT_HOME,
			SUPPORT_PATH_WITHOUT_HOME,
		}

	}

	async #resetHomeFile( path: string, type?: 'logic' | 'fcp' | undefined ) {

		try {

			console.log( { resetHomeFile: path } )
			if ( !await this.#opts.path.exists( path ) ) return true

			await this.#opts.path.removeFile( path )
			await this.#sendNot( {
				type : 'success',
				app  : type,
			} )
			return true

		}
		catch ( _e ) {

			console.warn( 'Using shell', path )

			const executed = await Command.create( 'rm', [ path ] ).execute()
			if ( executed.code === 0 ) {

				console.log( { executed } )
				return true

			}

			await this.#sendNot( {
				type : 'fail',
				app  : type,
			} )
			console.warn( 'error removing files', _e, { executed } )
			return false

		}

	}

	async removeFiles() {

		try {

			const { CHECK_PATH } = await this.#getHomePaths()
			let isReset          = false
			for ( const [ key, path ] of Object.entries( CHECK_PATH ) ) {

				const type = key.includes( 'finalcut' ) ? 'fcp' : key.includes( 'logic' ) ? 'logic' : undefined
				isReset    = await this.#resetHomeFile( path, type )

			}
			if ( !isReset ) await this.#sendNot( { type: 'fail' } )

		}
		catch ( _e ) {

			await this.#sendNot( { type: 'fail' } )

		}

	}

	async init() {

		const {
			SUPPORT_PATH_WITHOUT_HOME,
			CHECK_PATH,
		} = await this.#getHomePaths()

		const automate = this.#opts.store.automate
		const watcher  = this.#opts.path.watcher( [ SUPPORT_PATH_WITHOUT_HOME.GENERAL ], {
			preset  : true,
			baseDir : BaseDirectory.Home,
		} )

		watcher.on = async e => {

			// @ts-ignore
			const paths = e.paths as string[]

			const matchedPath = Object.values( CHECK_PATH ).find( value => paths.includes( value ) )

			if ( matchedPath ) {

				console.log( {
					watcherEvent : e,
					paths,
					matchedPath,
				} )
				await this.#resetHomeFile( matchedPath )

				console.log( e, matchedPath )

			}

		}

		automate.subscribe( async value => {

			if ( value === true ) {

				await this.removeFiles()
				await watcher.start()
				console.log( 'watcher started' )

			}
			else {

				await watcher.stop()
				console.log( 'watcher stopped' )

			}

		} )

	}

}
