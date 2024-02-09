/**
 * TODO inquirer.
 *
 * @description Add inquirer for edit project TODO List.
 */

import inquirer from 'inquirer'
import path     from 'path'
import fs       from 'fs/promises'
import { exec } from './_core.js'

const main = async () => {

	try {

		const currentDir       = path.dirname( new URL( import.meta.url ).pathname )
		const todoFolderPath   = path.resolve( currentDir, '../docs/todo/' )
		const files            = await fs.readdir( todoFolderPath )
		const fileNames        = files.map( file => file.replace( '.md', '' ) )
		const logFilesPathList = async () => {

			const files = await fs.readdir( todoFolderPath )
			console.group( '\nList of files in the "TODO" folder:' )
			files.forEach( file =>
				console.log( '- 🔗 ' + file.replace( '.md', '' ) + ': ' + path.join( todoFolderPath, file ) ),
			)
			console.groupEnd()

		}

		const logFilePath    = async fileName => {

			console.group( '\nTODO file path:' )
			console.log( '- 🔗 ' + fileName + ': ' + path.join( todoFolderPath, fileName + '.md' ) )
			console.groupEnd()
		
		}
		const logFileContent = async fileName => {

			const selectedFilePath = path.join( todoFolderPath, fileName + '.md' )
			console.log( '\nFile content:\n' )
			console.group()
			await exec( 'md ' + selectedFilePath )
			console.groupEnd()
		
		}

		const firstAnswers = await inquirer.prompt( [
			{
				type    : 'list',
				name    : 'selectedFile',
				message : 'Select a file from the "TODO" folder:',
				choices : [
					...fileNames, 'All','Exit',
				],
			},
		] )

		if ( firstAnswers.selectedFile !== 'Exit' ) {

			const answers = await inquirer.prompt( [
				{
					type    : 'confirm',
					name    : 'showInConsole',
					message : 'Do you want to show the selected file in the console?',
				},
			] )

			if ( firstAnswers.selectedFile !== 'All' ) {

				if ( answers.showInConsole ) 
					await logFileContent( firstAnswers.selectedFile )

				await logFilePath( firstAnswers.selectedFile )
			
			}else {

				if ( answers.showInConsole ) {

					for ( const fileName of fileNames ) {

						await logFileContent( fileName )
				
					}
				
				}
		
				await logFilesPathList()
			
			}

		} else {

			console.log( '✨ Exit from TODOs' )

		}
	
	} catch ( error ) {

		console.error( '❌ Error reading the "TODO" folder:', error )
	
	}

}

main()
