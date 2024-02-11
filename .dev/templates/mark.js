/**
 * Todo.
 *
 * @description Todo.
 */

import { generateASCII } from '../_core.js'
export const mark = pkg => {

	const data       = pkg.data
	const author     = data.author.name 
	const authorLink = data.author.url 
	const repoUrl    = data.repository.url 
	const version    = data.version ? data.version : 'UNDEFINDED'

	return `${generateASCII( 'MATE' )}                    
                                                
VERSION: 	${version} 
REPOSITORY: ${repoUrl}
AUTHORS: 
	- ${author} (${authorLink})

DEVELOPED BY ${author} 🐦🌈
` 

}
