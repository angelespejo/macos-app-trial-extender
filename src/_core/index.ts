import { App }          from './app'
import * as i18n        from './i18n'
import { Notification } from './notification'
import { Path }         from './path'
import { Reset }        from './reset'
import { store }        from './store'
import { Tray }         from './tray'
import { Window }       from './window'

export class Core {

	app
	notification
	path
	i18n
	window
	store
	reset
	tray

	constructor() {

		this.app          = new App()
		this.notification = new Notification()
		this.path         = new Path()
		this.i18n         = i18n
		this.store        = store
		this.window       = new Window( { store } )
		this.reset        = new Reset( {
			path  : this.path,
			store : this.store,
			not   : this.notification,
		} )
		this.tray         = new Tray( {
			goto       : this.window.goTo.bind( this.window ),
			store      : this.store,
			resetTrial : this.reset.removeFiles.bind( this.reset ),
		} )

	}

	async init( { pathname }: { pathname: string } ) {

		// Must be the first
		const {
			route, lang,
		} = await this.i18n.layoutFunct( pathname )

		console.log( { init : {
			automate     : this.store.get( this.store.automate ),
			notification : this.store.get( this.store.notification ),
			route,
			lang,
		} } )

		await this.window.init()
		await this.tray.init()
		await this.reset.init()
		await this.autostart()
		return {
			route,
			lang,
		}

	}

	async autostart() {

		// this.store.autostart.subscribe( async value => {

		// 	const status = await this.app.autostart.getStatus()
		// 	if ( value && !status ) await this.app.autostart.enable()
		// 	else if ( !value && status ) await this.app.autostart.disable()

		// } )

	}

}
