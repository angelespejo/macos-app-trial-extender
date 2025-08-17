export const APP_ID = APP_DATA.PKG.extra.id
export const APP_NAME = APP_DATA.PKG.extra.productName

export const FUNCTION_ID = {
	openPage : 'open-page',
	reset    : 'reset',
	automate : 'automate',
	quit     : 'quit',
	support  : 'support',
	feedback : 'feedback',
} as const

export const PAGE_ID = {
	info             : 'info',
	infoHow          : 'info-how',
	infoContributors : 'info-contributors',
	infoTests        : 'info-tests',
	settings         : 'settings',
} as const

export const PACKAGE_DATA = APP_DATA.PKG
export const PROJECT_CONTRIBUTORS = APP_DATA.CONTRIBUTORS
export const APP_INFO = APP_DATA.APP_INFORMATION
