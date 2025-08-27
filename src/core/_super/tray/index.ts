import {
	Menu,
	PredefinedMenuItem,
	MenuItem,
	Submenu,
	CheckMenuItem,
	type PredefinedMenuItemOptions,
} from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

type TrayMenuItem = {
	text?    : string
	checked? : boolean
	enabled? : boolean
	action?  : ( () => void | Promise<void> ) | Pick<PredefinedMenuItemOptions, 'item'>['item'] | { [id: string]: TrayMenuItem }
}

type TrayOptions = {
	id       : string
	tooltip? : string
	menu     : { [id: string]: TrayMenuItem }
}

export class Tray {

	#opts      : TrayOptions
	#tray      : TrayIcon | null = null
	#menuItems : Map<string, MenuItem | CheckMenuItem | PredefinedMenuItem | Submenu> = new Map()

	constructor( opts: TrayOptions ) {

		this.#opts = opts

	}

	async init() {

		this.#tray = await TrayIcon.getById( this.#opts.id )
		if ( !this.#tray ) {

			console.error( `Tray with id "${this.#opts.id}" not found` )
			return

		}

		if ( this.#opts.tooltip ) await this.#tray.setTooltip( this.#opts.tooltip )

		const menu = await this.#buildMenu( this.#opts.menu )
		await this.#tray.setMenu( menu )

	}

	async #buildMenu( items: { [id: string]: TrayMenuItem } ) {

		const builtItems = []

		for ( const [ id, item ] of Object.entries( items ) ) {

			let menuItem

			if ( typeof item.checked === 'boolean' ) {

				menuItem = await CheckMenuItem.new( {
					id,
					text    : item.text ?? id,
					checked : item.checked,
					enabled : item.enabled ?? true,
					action  : item.action as () => void,
				} )

			}
			else if ( typeof item.action === 'string' ) {

				menuItem = await PredefinedMenuItem.new( {
					text : item.text ?? id,
					item : item.action,
				} )

			}
			else if ( item.action && typeof item.action === 'object' ) {

				const submenu = await this.#buildMenu( item.action as { [id: string]: TrayMenuItem } )
				menuItem      = await Submenu.new( {
					id,
					text    : item.text ?? id,
					enabled : item.enabled ?? true,
					items   : await submenu.items(),
				} )

			}
			else {

				menuItem = await MenuItem.new( {
					id,
					text    : item.text ?? id,
					enabled : item.enabled ?? true,
					action  : item.action as () => void,
				} )

			}

			this.#menuItems.set( id, menuItem ) // 🔑 guardamos referencia
			builtItems.push( menuItem )

		}

		return await Menu.new( { items: builtItems } )

	}

	getItem( id: string ) {

		return this.#menuItems.get( id )

	}

}

