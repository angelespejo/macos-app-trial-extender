import lang from '$locales/lang.json'

export type i18nLangId = keyof typeof lang
export type i18nTranslation = { [key in i18nLangId]: { lang: typeof lang } }

export const translations: i18nTranslation = {
	ca : { lang },
	es : { lang },
	en : { lang },
}
const addLoader =  ( k: i18nLangId ) => ( [
	{
		locale : k,
		key    : 'common',
		loader : async () => ( await import( `$locales/${k}/common.json` ) ).default,
	},
	{
		locale : k,
		key    : 'tray',
		loader : async () => ( await import( `$locales/${k}/tray.json` ) ).default,
	},
] )

export const loaders = [
	...addLoader( 'en' ),
	...addLoader( 'es' ),
	...addLoader( 'ca' ),
]

export const defaultLocale = 'en' as const

export { lang }
