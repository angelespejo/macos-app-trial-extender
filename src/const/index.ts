
export const FUNCTION_ID = {
	openPage : 'open-page',
	reset    : 'reset',
	automate : 'automate',
	quit     : 'quit',
	support  : 'support',
	issues   : 'issues',
	feedback : 'feedback',

	notification : 'notification',
	theme        : 'theme',
	/** @deprecated */
	autostart    : 'autostart',
} as const

export const PAGE_ID = {
	info             : 'info',
	infoHow          : 'info-how',
	infoContributors : 'info-contributors',
	infoTests        : 'info-tests',
	settings         : 'settings',
} as const
export const APP_THEME = {
	DEFAULT  : 'default',
	MINIMAL  : 'minimal',
	LOGIC    : 'logic',
	FINALCUT : 'finalcut',
} as const
export const APP_ID = APP_DATA.PKG.extra.id
export const APP_NAME = APP_DATA.PKG.extra.productName

export const DATA = APP_DATA
