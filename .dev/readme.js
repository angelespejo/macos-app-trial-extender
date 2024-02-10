/**
 * Readme.
 *
 * @description Readme.
 */

import { readme }             from './templates/readme.js'
import {
	pkg, addTextBetweenAMark, 
} from './_core.js'

const dynamicReadme = () => {

	try{

		const readmeTemp = readme( pkg )

		addTextBetweenAMark( 'README.md', '<!-- PIGEONPOSSE START MARK -->', '<!-- PIGEONPOSSE END MARK -->', readmeTemp.mark )
		addTextBetweenAMark( 'README.md', '<!-- PIGEONPOSSE START ORG -->', '<!-- PIGEONPOSSE END ORG -->', readmeTemp.org )
		addTextBetweenAMark( 'README.md', '<!-- PIGEONPOSSE START HEADER -->', '<!-- PIGEONPOSSE END HEADER -->', readmeTemp.header )

	}catch( e ){

		throw '📝 ' + e

	}

}

try {
	
	dynamicReadme()

}catch( e ){

	console.log( '❌ ' + e )

}
