import type { IconProps } from '$lib'
import type { Snippet }   from 'svelte'
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from 'svelte/elements'

export type ButtonContentProps = {
	icon?         : IconProps
	iconPosition? : 'left' | 'right'
	children?     : Snippet
}
type ButtonSharedProps = ButtonContentProps & {
	color?  : 'none' | 'primary' | 'dark'
	shadow? : boolean
}
export type ButtonLinkProps = ButtonSharedProps & HTMLAnchorAttributes
export type ButtonProps = ButtonSharedProps & HTMLButtonAttributes

