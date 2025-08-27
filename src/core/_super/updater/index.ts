import { check } from '@tauri-apps/plugin-updater'

export class Updater {

	async check() {

		return await check()

	}

}
