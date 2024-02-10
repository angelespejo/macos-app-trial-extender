/**
 * Core for .Utils folder.
 *
 * @description Functions for .Utils folder.
 */
import {
	execSync, spawn, 
} from 'child_process'
import { fileURLToPath } from 'url'
import fs                from 'fs'
import path              from 'path'

export const exec = async cmd => {

	console.log( `🐢 CMD: ${cmd}` )
 
	await new Promise( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell : true,
			stdio : 'inherit',
		} )

		// Manejar eventos del proceso hijo
		childProcess.on( 'close', code => {

			if ( code === 0 ) {

				// El proceso hijo terminó con éxito
				resolve()
				
			} else {

				// El proceso hijo falló
				const error = new Error( `Command failed with code ${code}` )
				console.error( error )
				reject( error )
				
			}
			
		} )
		
	} )

}

export const pkgFunct = fileName => {

	const json = projectPath => JSON.parse( fs.readFileSync( projectPath ) )

	let projectPath = path.join(
		path.dirname( fileURLToPath( import.meta.url ) ),
		'..', 
	)

	// when is used in the compilated files of 'dist' folder
	if ( projectPath.includes( 'dist' ) || projectPath.includes( 'build' ) ) projectPath = path.join( projectPath, '..' )

	const pkgPath = path.join( projectPath, fileName + '.json' )
	const pkgData = json( pkgPath )

	return {
		path : pkgPath,
		dir  : projectPath,
		data : pkgData,
	}

}

export const pkg = pkgFunct( 'package' )

export const writeSync = ( projectPath, txt ) => {

	const filePath = path.join( pkg.dir, projectPath )

	console.log()

	console.group( `🐢 writeFileSync: ${filePath}` )
		
	fs.writeFileSync( filePath, txt )

	console.log( '✅ File overwritten!' )

	console.groupEnd()

}
export const joinPath = path.join

export const addTextBetweenAMark = async ( projectPath, startMarker, endMarker, textToAdd ) =>{

	const filePath       = path.join( pkg.dir, projectPath )
	const fileContent    = fs.readFileSync( filePath, 'utf-8' )
	const startIndex     = fileContent.indexOf( startMarker ) + startMarker.length
	const endIndex       = fileContent.indexOf( endMarker )
	const newTextContent = `${fileContent.substring( 0, startIndex )}\n${textToAdd}\n${fileContent.substring( endIndex )}`

	writeSync( projectPath, newTextContent )

}

export const renameAndCopyFiles = async ( oldFileName, tempFileName, newFileName ) => {

	try {

		await fs.promises.rename( oldFileName, tempFileName )
		await fs.promises.copyFile( tempFileName, newFileName )
	
	} catch ( error ) {

		console.error( error )
	
	}

}

export const createSymlink = async ( sourceDir, targetDir ) =>{

	try {

		await fs.promises.access( targetDir )
	
	} catch ( error ) {

		if ( error.code === 'ENOENT' ) {

			// El directorio destino no existe, lo creamos
			await fs.promises.mkdir( targetDir, {
				recursive : true, 
			} )
		
		} else {

			throw `❌🔗 ${error}`
		
		}
	
	}

	const sourceStat = await fs.promises.lstat( sourceDir )
	// const targetStat = await fs.promises.lstat( targetDir )
	const isWin = process.platform === 'win32'

	if ( sourceStat.isDirectory() ) {

		if ( isWin ) {

			// En Windows, debemos crear un enlace de tipo 'junction'
			await fs.promises.symlink( sourceDir, path.join( targetDir, path.basename( sourceDir ) ), 'junction' )
		
		} else {

			// En Linux y macOS, podemos crear enlaces simbólicos directos a directorios
			await fs.promises.symlink( sourceDir, path.join( targetDir, path.basename( sourceDir ) ), 'dir' )
		
		}
	
	} else if ( sourceStat.isFile() ) {

		// Si la fuente es un archivo, creamos un enlace simbólico a ese archivo
		await fs.promises.symlink( sourceDir, path.join( targetDir, path.basename( sourceDir ) ) )
	
	}

	console.log( `🔗 symlink: "${sourceDir}" to "${targetDir}".` )

}

export const copyDir = async ( src, dest ) => {

	try {

		// Read the source directory
		const entries = await fs.promises.readdir( src, {
			withFileTypes : true, 
		} )

		// Create the destination directory if it doesn't exist
		await fs.promises.mkdir( dest, {
			recursive : true, 
		} )

		// Loop through the entries in the source directory
		for ( const entry of entries ) {

			const srcPath  = path.join( src, entry.name )
			const destPath = path.join( dest, entry.name )

			if ( entry.isDirectory() ) {

				// Recursively copy the subdirectory
				await copyDir( srcPath, destPath )
			
			} else {

				// Copy the file
				await fs.promises.copyFile( srcPath, destPath )
			
			}
		
		}

		console.log( `📁 Directory copied from ${src} to ${dest}` )
	
	} catch ( error ) {

		throw `📁 Error copying directory: ${error.message}`
	
	}

}

export const getCurrentDateTime = () => {

	const currentDate = new Date()
	const year        = currentDate.getUTCFullYear()
	const month       = ( '0' + ( currentDate.getUTCMonth() + 1 ) ).slice( -2 )
	const day         = ( '0' + currentDate.getUTCDate() ).slice( -2 )
	const hours       = ( '0' + currentDate.getUTCHours() ).slice( -2 )
	const minutes     = ( '0' + currentDate.getUTCMinutes() ).slice( -2 )
	const seconds     = ( '0' + currentDate.getUTCSeconds() ).slice( -2 )
	
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

}

export const isGitHubAuthenticated = () =>{

	try {

		const output = execSync( 'gh auth status', {
			encoding : 'utf-8', 
		} )
		return output.includes( 'Active account: true' )
	
	} catch ( error ) {

		return false
	
	}

}

