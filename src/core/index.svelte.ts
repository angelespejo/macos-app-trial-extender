import {
	appWindow,
	os,
}  from './_super.svelte'
import {
	changeToSystemLocale,
	page,
} from './page.svelte'
import { reset }    from './reset.svelte'
import { settings } from './settings.svelte'
import { tray }     from './tray.svelte'

class App {

	settings = settings
	window = appWindow
	reset = reset
	page = page

	#isInit = $state( false )

	async init() {

		if ( this.#isInit ) return

		console.log( { settings } )

		appWindow.addDragging()

		if ( !import.meta.env.DEV )
			document.oncontextmenu = event => event.preventDefault()

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

		if ( !this.page.locale.isStored() ) await changeToSystemLocale()

		this.#isInit = true

	}

}

export const app = new App()

