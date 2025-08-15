import {
	color,
	promptLine,
} from '@dovenv/core/utils'

import { addMember } from './add-member.js'
import { validate }  from './utils.js'

import type {
	MembersWithId,
	MemberID,
} from './types'
import type { Contributors } from '../types'

const selectMember = async ( members: Contributors['member'] ): Promise<MemberID> => {

	const member = await validate( await promptLine.select( {
		message : 'Select member',
		options : Object.entries( members ).map( ( [ k, v ] ) => ( {
			value : k as MemberID,
			label : v.name + ' (' + v.role + ')',
		} ) ),
	} ) )

	if ( typeof member === 'string' ) return member
	throw new Error( 'Invalid member' )

}

const selectTester = async ( members: Contributors['member'] ): Promise<MembersWithId> => {

	const id = await validate( await promptLine.text( {
		message     : 'Enter tester id',
		placeholder : 'angelo',
		validate    : v => {

			if ( v.length <= 0 ) return 'Invalid tester id'
			const membersId = Object.keys( members )
			if ( Object.keys( members ).includes( v ) )
				return 'Tester id already exists. Existing tester ids: ' + membersId.join( ',' )
			return undefined

		},
	} ) )

	const ghUsername = await validate( await promptLine.text( {
		message      : 'Enter tester github username',
		initialValue : id,
		validate     : v => {

			if ( v.length <= 0 ) return 'Invalid tester github username'

		},
	} ) )

	const name =  await validate( await promptLine.text( {
		message      : 'Enter tester name',
		initialValue : ghUsername,
	} ) )

	const url = await validate( await promptLine.text( {
		message      : 'Enter tester url',
		initialValue : 'https://github.com/' + ghUsername,
		validate     : v => v.length > 0 ? undefined : 'Invalid tester url',
	} ) )

	return {
		ghUsername,
		name,
		url,
		id   : id as MemberID,
		role : 'tester',
	}

}

const getContributors = async (): Promise<Contributors> => {

	const cont = await import( '../contributors.js' )

	return {
		role   : cont.role,
		member : cont.member as unknown as Contributors['member'],
	}

}

const printContributors = ( contributors:Contributors ) => {

	promptLine.log.message( color.inverse( ' Contributors ' ) + ' See available roles and members' )
	promptLine.log.message( color.inverse.gray( ' Roles ' ) )
	promptLine.columns( {
		value : Object.entries( contributors.role ).map( ( [ key, value ] ) => ( {
			Name        : value.name + ' (' + color.green( key ) + ')',
			Description : color.dim( value.desc ),
		} ) ),
		opts : { showHeaders: false },
	} )

	promptLine.log.message( color.inverse.gray( ' Members ' ) )
	promptLine.columns( {
		value : Object.entries( contributors.member ).map( ( [ id, member ] ) => ( {
			Key  : id,
			Name : color.dim( member.name + ' (' + color.green( member.role ) + ')' ),

		} ) ),
		opts : { showHeaders: false },
	} )
	promptLine.log.message( '' )

}

export const askMember = async (): Promise<MemberID> => {

	const contributors = await getContributors()

	printContributors( contributors )

	const addnew = await validate( await promptLine.confirm( {
		message      : 'Do you want to add a new tester?',
		initialValue : false,
	} ) )

	if ( typeof addnew !== 'boolean' ) throw new Error( 'Invalid Answer' )

	if ( !addnew ) {

		const member = await selectMember( contributors.member )
		if ( member in contributors.member ) return member
		throw new Error( 'Invalid member' )

	}

	const tester = await selectTester( contributors.member )

	await addMember( tester )

	return tester.id

}
