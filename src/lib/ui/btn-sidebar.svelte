<script lang="ts">

	import Button from './btn.svelte'

	import type { BtnSidebarProps } from './types'

	import { Fa } from '$lib'

	let {
		icon,
		href = '/',
		title = '',
		active = $bindable( false ),
		blank = false,
		class: klass,
	}: BtnSidebarProps = $props()

</script>

<Button
	class={[
		'button--sidebar',
		active ? 'active' : '',
		klass,
	]}
	{blank}
	color="none"
	{href}
>
	<Fa
		class={title && title != '' ? 'p-2 !h-7 -ml-3 !w-7 rounded-full bg-primary-50/10' : ''}
		icon={icon}
	/>

	{#if title}
		{title}
	{/if}
</Button>
