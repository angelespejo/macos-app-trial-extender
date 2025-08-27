import type { HTMLAttributes } from 'svelte/elements'

export type SectionProps = HTMLAttributes<HTMLDivElement> & {
	title?          : string
	accordeon?      : boolean
	accordeonValue? : boolean
}
