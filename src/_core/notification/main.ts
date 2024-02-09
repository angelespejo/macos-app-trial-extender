/**
 * Todo.
 *
 * @description Todo.
 */
import {
	isPermissionGranted, 
	requestPermission, 
	sendNotification, 
} from '@tauri-apps/api/notification'

type NotSendParms = {
    title: string, 
    body: string
}

export class Notification {

	async send( { title, body }: NotSendParms ){

		let permissionGranted = await isPermissionGranted()
		if ( !permissionGranted ) {

			const permission  = await requestPermission()
			permissionGranted = permission === 'granted'
		
		}
		if ( permissionGranted ) {

			sendNotification( {
				title, 
				body, 
			} )
		
		}
	
	}

}

