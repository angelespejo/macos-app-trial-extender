import {
	color,
	promptLine,
} from '@dovenv/core/utils'
import { parse } from 'acorn'
import * as walk from 'acorn-walk'
import {
	readFile,
	writeFile,
} from 'node:fs/promises'

import { APP_INFO_PATH } from './const'

import type { AppInfoConfigTest } from '../types'
import type { Any }               from './types'

export const _add = async ( id: 'finalcut' | 'logicpro', test: AppInfoConfigTest ) => {

	let code = await readFile( APP_INFO_PATH, 'utf8' ),
		insertPos: number | null = null,
		arrayIndent = ''

	const ast = parse( code, {
		ecmaVersion : 'latest',
		sourceType  : 'module',
	} )

	walk.simple( ast, { Property( node: Any ) {

		if ( node.key.type === 'Identifier' && node.key.name === id ) {

			if ( node.value.type === 'ObjectExpression' ) {

				const testsProp = node.value.properties.find(
					( p: Any ) =>
						p.type === 'Property'
						&& p.key.type === 'Identifier'
						&& p.key.name === 'tests'
						&& p.value.type === 'ArrayExpression',
				)
				if ( testsProp ) {

					insertPos   = testsProp.value.end - 1
					const match = code.slice( testsProp.start, testsProp.value.start ).match( /\n(\s*)/ )
					if ( match ) arrayIndent = match[1] + '\t' // misma indentación + tab extra

				}

			}

		}

	} } )

	if ( insertPos === null ) {

		throw new Error( 'Could not find property `tests` in `appInfo`.' )

	}

	const testStr = '// Automatically added with the command line.\n' + JSON.stringify( test, null, 2 )
		.split( '\n' )
		.map( ( line, i ) => ( i === 0 ? line : arrayIndent + line ) )
		.join( '\n' )

	// const beforeClose = code.slice( insertPos - 1, insertPos )
	// const needsComma  = beforeClose !== '['

	const newTestCode =  `\n${arrayIndent}${testStr}`

	code = code.slice( 0, insertPos ) + newTestCode + code.slice( insertPos )

	await writeFile( APP_INFO_PATH, code, 'utf8' )

}

export const addTest = async ( id: 'finalcut' | 'logicpro', test: AppInfoConfigTest ) => {

	const ID_TEXT = color.bold( id )
	promptLine.log.message( '' )
	const spinner = promptLine.spinner( )
	try {

		spinner.start( color.inverse( ' Adding test for ' + ID_TEXT ) )
		await _add( id, test )

		spinner.stop( color.green( '✓ Test added for ' + ID_TEXT ) )

	}
	catch ( e ) {

		spinner.stop( color.red( '✗ Error adding test for ' + ID_TEXT + ( e instanceof Error ? `: ${e.message}` : '' ) ), 1 )

	}
	promptLine.log.message( '' )

}
