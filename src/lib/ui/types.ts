import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from 'svelte/elements'

export type BtnProps<Blank extends boolean | undefined> = ( Blank extends true ? HTMLAnchorAttributes : HTMLButtonAttributes ) & {
	icon?    : IconDefinition
	href?    : string
	blank?   : Blank
	onClick? : HTMLButtonAttributes['onclick']
	color?   : 'none' | 'primary' | 'dark'
	shadow?  : boolean
}

export type BtnSidebarProps = HTMLAnchorAttributes & {
	icon    : IconDefinition
	href?   : string
	title?  : string
	active? : boolean
	blank?  : boolean
}
