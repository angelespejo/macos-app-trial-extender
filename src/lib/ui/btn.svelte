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
		class: klass,
		...rest
	}: Props & Record<string, any> = $props()

</script>

{#if blank === true}
	<ButtonLink
		class={[ 'theme-radius', klass ]}
		{href}
		target="_blank"
		{...rest as any}
	>
		{@render children?.()}
	</ButtonLink>
{:else}
	<Button
		class={[ 'theme-radius', klass ]}
		onclick={async e => {

			// @ts-ignore
			if ( onclick ) await onclick( e )
			if ( href ) await app.page.goto( href )

		}}
		{...rest as any}
	>
		{@render children?.()}
	</Button>
{/if}

