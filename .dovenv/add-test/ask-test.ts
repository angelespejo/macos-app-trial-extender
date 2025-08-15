import {
	color,
	promptLine,
} from '@dovenv/core/utils'

import { askMember } from './ask-member.js'
import {
	getAppVersion,
	getMacosVersion,
	validate,
} from './utils.js'

import type {
	AppInfoConfigTest,
	AppInfoID,
} from '../types.js'

const app = async (): Promise<'finalcut' | 'logicpro'> => await validate( await promptLine.select( {
	message      : 'Select Application for the test',
	initialValue : 'finalcut',
	options      : [
		{
			value : 'finalcut',
			label : 'Final Cut Pro',
		},
		{
			value : 'logicpro',
			label : 'Logic Pro',
		},
	],
} ) )

const test = async ( appId: AppInfoID ): Promise<AppInfoConfigTest> => ( {
	appVersion : await ( async () => {

		const defaultVersion = await getAppVersion( appId )

		promptLine.log.info( color.bold( `Current ${appId} version` ) + `: ${color.dim( defaultVersion || 'n/a' )}` )

		return await validate( await promptLine.text( {
			message      : `Enter ${color.bold( appId )} App version for the test`,
			initialValue : defaultVersion,
			placeholder  : defaultVersion || '10.5',
			validate     : v => v.length > 0 ? undefined : 'Invalid app version',
		} ) )

	} )(),
	osVersion : await ( async () => {

		const osVersion = getMacosVersion()
		promptLine.log.info( color.bold( 'Current MacOS version' ) + `: ${color.dim( osVersion )}` )
		return await validate( await promptLine.text( {
			message      : `Enter ${color.bold( 'MacOS' )} version for the test`,
			initialValue : osVersion,
			validate     : v => v.length > 0 ? undefined : 'Invalid OS version',
		} ) )

	} )(),
	referenceUrl : await ( async () => {

		const wontReference = await validate( await promptLine.confirm( {
			message      : 'Do you want to add a reference URL to the test?',
			initialValue : false,
		} ) )
		if ( wontReference ) return await validate( await promptLine.text( {
			message  : 'Enter reference URL to the test',
			validate : v => v.length > 0 ? undefined : 'Invalid reference url',
		} ) )

	} )(),
	status : await validate( await promptLine.select( {
		message      : 'Select test status',
		initialValue : 'success',
		options      : [
			{
				value : 'success',
				label : color.greenBright( '✓' ) + ' Success',
			},
			{
				value : 'failure',
				label : color.redBright( '✗' ) + ' Failure',
			},
			{
				value : 'skipped',
				label : color.yellowBright( '▲' ) + ' Skipped',
			},
		],
	} ) ),
	user : await ( async () => {

		const member = await askMember()

		return [ member ]

	} )(),
} )

export const askTest = async () => {

	promptLine.log.message( color.inverse( ' Add new test ' ) )
	const appId = await app()

	return {
		appId,
		test : await test( appId ),
	}

}
