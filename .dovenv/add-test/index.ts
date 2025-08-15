import {
	color,
	promptLine,
} from '@dovenv/core/utils'

import { addTest }  from './add-test'
import { askTest }  from './ask-test'
import { validate } from './utils'

const run = async () => {

	const {
		appId, test,
	} = await askTest()

	await addTest( appId, test )
	const another = await validate( await promptLine.confirm( {
		message      : 'Do you want to add another test?',
		initialValue : false,
	} ) )

	promptLine.log.message( '' )
	if ( !another ) {

		promptLine.outro( color.bold.green( 'Process completed!' ) + color.green( ' Thank you for contributing. 🫶' ) )
		process.exit( 0 )

	}

	await run()

}

console.log()
promptLine.intro( color.inverse.cyan( ` ${color.bold( 'MATE' )}: Add test(s) ` ) )
promptLine.log.message( '' )
run()
