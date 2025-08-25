import { Fs }           from './_super/fs'
import { Log }          from './_super/log'
import { Notification } from './_super/notification'
import { Os }           from './_super/os'
import { Window }       from './_super/window'
import { i18n }         from './i18n.svelte'
import { Reset }        from './reset.svelte'
import { settings }     from './settings.svelte'
import { Tray }         from './tray.svelte'

import { page } from '$app/state'
import {
	locales,
	setLocale,
} from '$lib/i18n'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log          = new Log( { forwardConsole: true } )
const os           = new Os()
const notification = new Notification()
const fs           = new Fs()

const appWindow = new Window( { suffix: page.data?.lang } )

const reset = new Reset( {
	fs  : fs,
	not : notification,
	os  : os,
} )

const tray = new Tray( {
	os         : os,
	goto       : ( v: string ) => appWindow.page.goto( v ),
	resetTrial : reset.removeFiles.bind( reset ),
} )

const changeToSystemLocale = async () => {

	const availableLocales = locales.get()
	const locale           = await os.getLocale()
	if ( !locale ) return
	for ( const l of availableLocales ) {

		if ( l === locale ) return setLocale( l )
		if ( l.startsWith( locale ) ) return setLocale( l )

	}
	return

}

class App {

	settings = settings
	window = appWindow
	reset = reset
	locale = i18n.locale
	locales = i18n.locales
	t = i18n.t

	#isInit = $state( false )

	async init() {

		if ( this.#isInit ) return

		console.log( { settings } )

		appWindow.addDragging()

		await appWindow.onFocusChanged( async ( { focused } ) => {

			try {

				if ( !focused ) return

				const docIconExists = await os.invoke( 'get_icon_visibility' )
				if ( !docIconExists ) await os.invoke( 'icon_visibility', { showIcon: focused } )

			}
			catch ( e ) {

				console.warn( e )

			}

		} )

		await appWindow.onCloseRequested( async () => {

			try {

				const currentWindow = await appWindow.get()
				await currentWindow.hide()
				await os.invoke( 'icon_visibility', { showIcon: false } )

			}
			catch ( e ) {

				console.warn( e )

			}

		} )

		await tray.init()
		await reset.init()
		// await autostart()

		await changeToSystemLocale()

		this.#isInit = true

	}

}

export const app = new App()
