import type { Snippet } from 'svelte'
import type {
	HTMLAnchorAttributes,
	HTMLAttributes,
} from 'svelte/elements'

export type BadgeContentProps = {
	children? : Snippet
	type?     : 'warning' | 'primary' | 'secondary' | 'tertiary' | 'error' | 'success'
	link?     : HTMLAnchorAttributes
} & HTMLAttributes<HTMLSpanElement>
