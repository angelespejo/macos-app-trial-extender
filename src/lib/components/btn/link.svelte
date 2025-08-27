<script lang="ts">

	import Content from './content.svelte'

	import type {  ButtonLinkProps } from './types'

	import { ripple } from '$lib'

	let {
		icon,
		iconPosition,
		// @ts-ignore
		href,
		children,
		color = 'primary',
		shadow = false,
		class: klass,
		...rest
	}: ButtonLinkProps = $props()

	let classes = [
		`button--${color}`,
		'button',
		shadow ? 'button--shadow' : '',
		'button',
		klass,
	]

</script>

<a
	{href}
	target="_blank"
	{...rest}
	class={classes}
	use:ripple
>
	<Content
		{icon}
		{iconPosition}
	>
		{@render children?.()}
	</Content>
</a>
