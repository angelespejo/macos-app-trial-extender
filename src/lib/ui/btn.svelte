<script
	generics="Props extends ButtonProps | ButtonLinkProps"
	lang="ts"
>

	import { app } from '$core'
	import {
		Button,
		ButtonLink,
		type ButtonLinkProps,
		type ButtonProps,
	} from '$lib'

	let {
		children,
		onclick,
		href,
		blank,
		...rest
	}: Props & {
		href?  : string
		blank? : boolean
	} = $props()

</script>

{#if blank}
	<ButtonLink
		href
		target="_blank"
		{...rest as any}
	>
		{@render children?.()}
	</ButtonLink>
{:else}
	<Button
		onclick={async e => {

			// @ts-ignore
			if ( onclick ) await onclick( e )
			if ( href ) await app.window.page.goto( href )

		}}
		{...rest as any}
	>
		{@render children?.()}
	</Button>
{/if}

