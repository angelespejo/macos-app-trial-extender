
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from 'svelte/elements'

export type BtnProps<Blank extends boolean | undefined> = ( Blank extends true ? HTMLAnchorAttributes : HTMLButtonAttributes ) & {
	icon?    : string
	href?    : string
	blank?   : Blank
	onClick? : HTMLButtonAttributes['onclick']
	color?   : 'none' | 'primary' | 'dark'
	shadow?  : boolean
}

export type BtnSidebarProps = HTMLAnchorAttributes & {
	icon    : string
	href?   : string
	title?  : string
	active? : boolean
	blank?  : boolean
}
