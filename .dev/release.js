/**
 * Release inquirer.
 *
 * @description Inquirer for release versions in github.
 */

import inquirer                             from 'inquirer'
import { releaseIt }                        from './templates/releaseIt.js'
import {
	exec, isGitHubAuthenticated, writeSync, 
} from './_core.js'

const noRelease = process.argv.includes( '--no-release' )
const auth      = isGitHubAuthenticated()

if( !auth ) {

	console.log( '❌ You need to logged with github. use: gh auth login' )
	process.exit()

}

const release = async () => {

	writeSync( '.release-it.json', releaseIt )
	
	console.log( '' )
	const todoAnswers = await inquirer.prompt( [
		{
			type    : 'confirm',
			name    : 'todo',
			message : 'Do you want to mark something as done on the todo list?',
		},
	] )
	
	if ( todoAnswers.todo ) {

		await exec ( 'pnpm todo' )
		process.exit()
	
	}

	const answers = await inquirer.prompt( [
		{
			type    : 'input',
			name    : 'git_add',
			message : 'Add files for git',
			default : () => '.',
		},
	] )

	if ( !answers || !answers.git_add ) return

	const cmd = {
		gitAdd    : 'git add ' + answers.git_add,
		gitCommit : 'pnpm co',
		push      : 'git push -u origin main',
		releaseIt : 'pnpm release-it',
	}
	
	await exec( cmd.gitAdd )
	await exec( cmd.gitCommit )
	
	if ( noRelease ) await exec( cmd.push )
	else await exec( cmd.releaseIt )

}

try {
	
	release()

}catch( e ){

	console.log( '❌ ' + e )

}
