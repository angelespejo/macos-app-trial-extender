
import { locales } from '../_core/i18n'

export const match = param => {

	const definedLocales = locales.get()
	const paths          = [ ...definedLocales, '' ]
	const slashPaths     = paths.map( l => `${l}/` )

	return [ ...paths, ...slashPaths ].includes( param )

}
