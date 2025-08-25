<script lang="ts">

	import Content from './content.svelte'

	import type { ButtonProps } from './types'

	import { ripple } from '$lib'

	let {
		icon,
		iconPosition,
		children,
		color = 'primary',
		shadow = false,
		class: klass,
		...rest
	}: ButtonProps = $props()

	let classes = [
		`button--${color}`,
		'button',
		shadow ? 'button--shadow' : '',
		'button',
		klass,
	]

</script>

<button
	type="button"
	use:ripple
	{...rest}
	class={classes}
>
	<Content
		{icon}
		{iconPosition}
	>
		{@render children?.()}
	</Content>
</button>
