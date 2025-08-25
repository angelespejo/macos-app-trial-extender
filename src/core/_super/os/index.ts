
import {
	invoke,
	type InvokeArgs,
} from '@tauri-apps/api/core'
import { locale } from '@tauri-apps/plugin-os'
import {
	Command,
	open,
} from '@tauri-apps/plugin-shell'

export class Os {

	open = open

	async getLocale() {

		const _locale = await locale()
		return _locale || ( navigator && navigator.language ) || undefined

	}

	async invoke<T>( cmd: string, args?: InvokeArgs ): Promise<T> {

		try {

			return await invoke<T>( cmd, args )

		}
		catch ( e ) {

			throw new Error( 'Error invoking ' + cmd + ( e instanceof Error ? `: ${e.message}` : '' ) + '\n' )

		}

	}

	async executeCommand( cmd: string, args?: string[] ) {

		return await Command.create( cmd, args ).execute()

	}

}
