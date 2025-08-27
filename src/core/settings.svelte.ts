
import { persistedState }     from './_super/_shared/persisted.svelte'
import { appPersistentState } from './store.svelte'

import {
	iconFinalcutSrc,
	iconLogicSrc,
	iconMinimalSrc,
	iconSrc,
} from '$assets'
import {
	APP_THEME,
	FUNCTION_ID,
} from '$const'

class SettingsState {

	init = $state( false )
	automate = appPersistentState( {
		key          : FUNCTION_ID.automate,
		initialValue : false,
	} )

	autostart = appPersistentState( {
		key          : FUNCTION_ID.autostart,
		initialValue : false,
	} )

	notification = appPersistentState( {
		key          : FUNCTION_ID.notification,
		initialValue : false,
	} )

	theme = appPersistentState<typeof APP_THEME[keyof typeof APP_THEME]>( {
		key          : FUNCTION_ID.theme,
		initialValue : APP_THEME.DEFAULT,
	} )

	APP_LOGO_SRC = $derived(
		this.theme.current === APP_THEME.MINIMAL
			? iconMinimalSrc
			: this.theme.current === APP_THEME.FINALCUT
				? iconFinalcutSrc
				: this.theme.current === APP_THEME.LOGIC
					? iconLogicSrc
					: iconSrc,
	)

}

export const settings = new SettingsState()
