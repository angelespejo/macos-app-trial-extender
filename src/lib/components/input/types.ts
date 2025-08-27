import type {
	HTMLInputAttributes,
	HTMLOptionAttributes,
	HTMLSelectAttributes,
} from 'svelte/elements'

export type ToggleProps = HTMLInputAttributes
export type SelectProps = HTMLSelectAttributes & { options: ( {
	value : string
	text? : string
	attr? : Omit<HTMLOptionAttributes, 'value'>
} )[] }
