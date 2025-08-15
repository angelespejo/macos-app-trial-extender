export const APP_ID = PKG.extra.id

export const FUNCTION_ID = {
	openPage : 'open-page',
	reset    : 'reset',
	automate : 'automate',
	quit     : 'quit',
	support  : 'support',
	feedback : 'feddback',
} as const

export const PAGE_ID = {
	info             : 'info',
	infoHow          : 'info-how',
	infoContributors : 'info-contributors',
	infoTests        : 'info-tests',
	settings         : 'settings',
} as const

export const PACKAGE_DATA = PKG

export const PROJECT_CONTRIBUTORS = CONTRIBUTORS

export const APP_INFO = APP_INFORMATION
