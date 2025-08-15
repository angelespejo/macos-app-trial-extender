import {
	color,
	promptLine,
} from '@dovenv/core/utils'
import { parse } from 'acorn'
import * as walk from 'acorn-walk'
import {
	readFile,
	writeFile,
} from 'fs/promises'

import { CONTRIBUTORS_PATH } from './const'

import type { MembersWithId } from './types'

const _addMember = async ( member: MembersWithId ) => {

	let code = await readFile( CONTRIBUTORS_PATH, 'utf8' ),
		insertPos: number | null = null,
		alreadyExists            = false

	// First, update the JSDoc type annotation if present
	const recordRegex = /@type\s*\{\s*Record<([^>]+)>\s*\}/
	const match       = code.match( recordRegex )
	if ( match ) {

		const currentKeys = match[1].split( '|' ).map( k => k.trim().replace( /^'|'$/g, '' ) )
		if ( !currentKeys.includes( member.id ) ) {

			currentKeys.push( member.id )
			const updatedKeys = currentKeys.map( k => `'${k}'` ).join( ' | ' )
			code              = code.replace( recordRegex, `@type {Record<${updatedKeys}>}` )

		}
		else {

			alreadyExists = true

		}

	}

	// Parse with Acorn
	const ast = parse( code, {
		ecmaVersion : 'latest',
		sourceType  : 'module',
	} )

	// Find `member` object and check for duplicates
	walk.simple( ast,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		{ VariableDeclarator( node: any ) {

			if ( node.id.name === 'member' && node.init.type === 'ObjectExpression' ) {

				for ( const prop of node.init.properties ) {

					if ( prop.key?.name === member.id || prop.key?.value === member.id ) {

						alreadyExists = true
						return

					}

				}
				insertPos = node.init.end - 1

			}

		} } )

	if ( alreadyExists ) {

		console.error( `⚠️ Member "${member.id}" already exists in 'member' or JSDoc type.` )
		return

	}

	if ( insertPos === null ) {

		console.error( '❌ Could not find \'member\' object.' )
		process.exit( 1 )

	}

	// Create new member block
	const newMember = `	// Automatically added with the command line.
	${member.id} : {
		name       : '${member.name}',
		ghUsername : '${member.ghUsername}',
		role       : '${member.role}',
		url        : '${member.url}',
	},
`

	// Add comma if needed
	// const needsComma = code[insertPos - 1] !== '{' && code[insertPos - 1] !== ','
	// const insertion  = ( needsComma ? ',' : '' ) + newMember

	// Insert and save file
	code = code.slice( 0, insertPos ) + newMember + code.slice( insertPos )
	await writeFile( CONTRIBUTORS_PATH, code, 'utf8' )

}

export const addMember = async ( member: MembersWithId ) => {

	promptLine.log.message( '' )
	const spinner = promptLine.spinner( )
	try {

		spinner.start( color.inverse( ' Adding member to contributors file' ) )
		await _addMember( member )

		spinner.stop( color.green( '✓ Member added to contributors file' ) )

	}
	catch ( e ) {

		spinner.stop( color.red( '✗ Error adding member to contributors file' + ( e instanceof Error ? `: ${e.message}` : '' ) ), 1 )

	}
	promptLine.log.message( '' )

}
