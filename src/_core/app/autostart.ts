
import {
	enable,
	isEnabled,
	disable,
} from 'tauri-plugin-autostart-api'

export class Autostart {

	isEnabled : boolean

	constructor() {

		this.isEnabled = false
		this.#init()

	}

	async #init() {

		this.isEnabled = await isEnabled()

	}

	async getStatus() {

		return await isEnabled()

	}

	async enable(): Promise<boolean> {

		await enable()
		const enabled  = await isEnabled()
		this.isEnabled = enabled
		return enabled

	}

	async disable(): Promise<boolean> {

		await disable()
		const enabled  = await isEnabled()
		this.isEnabled = enabled
		return enabled

	}

	async toggle(): Promise<boolean> {

		const enabled = await isEnabled()

		if ( enabled )
			await this.enable()
		else
			await this.disable()

		const enabledRes = await isEnabled()
		this.isEnabled   = enabledRes
		return enabledRes

	}

}
