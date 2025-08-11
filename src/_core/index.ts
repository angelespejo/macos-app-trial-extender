
import { invoke } from '@tauri-apps/api/tauri'

import { App }          from './app'
import * as i18n        from './i18n'
import { Notification } from './notification'
import { Path }         from './path'
import { store }        from './store'
import { Window }       from './window'

import {
	goto,
	onNavigate,
} from '$app/navigation'
import { page }         from '$app/stores'
import { PACKAGE_DATA } from '$const'

export class Core {

	app = new App()
	notification = new Notification()
	path = new Path()
	store = store
	i18n = i18n

	init() {

		const w = new Window()
		w.drag( {} )

		w.onSystemtray( async ( {
			type, data,
		} ) => {

			if ( type === this.store.functionsIDs.openPage ) this.goTo( data )
			else if ( type === this.store.functionsIDs.reset ) await this.resetTrial()
			else if ( type === this.store.functionsIDs.automate ) this.store.automate.toggle()

		} )

		this.resetTrialWatcher()
		this.changeTrayName()
		this.autostart()

	}

	goTo( pageID: string ) {

		const $page = this.store.get( page )
		pageID      = pageID.startsWith( '/' ) ? pageID : '/' + pageID
		goto( `/${$page.data.lang}${pageID}` )

	}

	isOnPage( pageID: string ) {

		const $page = this.store.get( page )

		const activeUrl = $page.url.pathname.replace( '/' + $page.data.lang, '' )
		const pageRoute = pageID === '' ? pageID : '/' + pageID

		return activeUrl === pageRoute

	}

	navTransitions() {

		onNavigate( navigation => {

			this.store.isNavigation.set( true )

			// @ts-ignore
			if ( !document.startViewTransition ) return

			return new Promise( resolve => {

				// @ts-ignore
				document.startViewTransition( async () => {

					resolve()
					await navigation.complete

				} )

			} )

		} )

	}

	async #sendNot() {

		if ( !this.store.get( this.store.notification ) ) return
		const $t = this.store.get( this.i18n.t )
		await this.notification.send( {
			title : PACKAGE_DATA.extra.productName + ' (' + PACKAGE_DATA.extra.productNameLong + ')',
			body  : $t( 'common.nots.reset' ),
		} )

	}

	async resetTrial() {

		await invoke( 'reset_trial_data' )
		await this.#sendNot()

	}

	async changeTrayName() {

		this.i18n.locale.subscribe( value => {

			const translations = this.store.get( this.i18n.translations )[value] as object
			if ( translations !== null && translations !== undefined ) {

				const res = Object.entries( translations ).reduce( ( acc, [ k, v ] ) => {

					// @ts-ignore
					if ( k.startsWith( 'tray' ) ) acc[k.split( '.' )[1]] = v
					return acc

				}, {} )

				invoke( 'backend_i18n', {
					langObj : res,
					langId  : value,
				} )

			}

		} )

	}

	autostart() {

		this.store.autostart.subscribe( async value => {

			const status = await this.app.autostart.getStatus()
			if ( value && !status ) await this.app.autostart.enable()
			else if ( !value && status ) await this.app.autostart.disable()

		} )

	}

	async resetTrialWatcher() {

		const home             = await this.path.homeDir()
		const appSupportPath   = 'Library/Application Support'
		const logicPathName    = '/.lpxuserdata'
		const finalcutPathName = '/.ffuserdata'
		const appSupport       = home + appSupportPath
		const automate         = this.store.automate
		const watcher          = this.path.watcher( [ appSupport ], { preset: true } )

		automate.subscribe( async value => {

			invoke( 'reset_trial_data_watcher', { activate: value } )

			if ( value === true ) {

				await this.resetTrial()
				await watcher.start()

			}
			else {

				await watcher.stop()

			}

		} )

		watcher.on = async e => {

			// console.log( e )

			// @ts-ignore
			const path     = e.path as string
			const logic    = path === appSupport + logicPathName ? e : false
			const finalcut = path === appSupport + finalcutPathName ? e : false

			if ( logic || finalcut ) {

				const existsLP = await this.path.existsHomePath( appSupportPath + logicPathName )
				console.log( existsLP )
				if ( existsLP ) {

					await this.path.removeHomeFile( appSupportPath + logicPathName )
					await this.#sendNot()

				}
				else if ( await this.path.existsHomePath( appSupportPath + finalcutPathName ) ) {

					await this.path.removeHomeFile( appSupportPath + finalcutPathName )
					await this.#sendNot()

				}
				console.log( e, logic, finalcut )

			}

		}

	}

}
