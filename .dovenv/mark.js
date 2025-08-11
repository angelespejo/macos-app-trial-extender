import { Font }       from '@ascii-kit/font'
import fontAnsiShadow from '@ascii-kit/font-ansi--shadow'

/**
 *
 * Get mark.
 *
 * @param   {typeof import('../package.json')} pkg - package.json
 * @returns {Promise<string>}                      Mark string
 */
export const getMark = async pkg => {

	const author     = pkg.author.name
	const authorLink = pkg.author.url
	const repoUrl    = pkg.repository.url
	const version    = pkg.version ? pkg.version : 'UNDEFINDED'

	const mark = await ( new Font( fontAnsiShadow ) )
		.text( `${pkg.extra.collective.name}\n-------\n${pkg.extra.productName}` )

	return `${mark}                    
                                                
VERSION: 	${version} 
REPOSITORY: ${repoUrl}
AUTHORS: 
	- ${author} (${authorLink})

DEVELOPED BY ${pkg.extra.collective.name || author} 🐦🌈
`

}
