
// import { Autostart } from './autostart'
import { locale } from '@tauri-apps/plugin-os'

export class App {

	// autostart : Autostart

	// constructor() {

	// 	this.autostart = new Autostart()

	// }

	async getLocale() {

		const _locale = await locale()
		return _locale || navigator.language || undefined

	}

}
