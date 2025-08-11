<script lang="ts">

	import Button from './main.svelte'

	import {
		Fa,
		type IconDefinition,
	} from '$lib'

	export let icon: IconDefinition
	export let href:string = '/'
	export let title:string = ''
	export let active: boolean = false
	export let blank: boolean = false

	let activeClass   = 'bg-primary-500 text-gray-900 border-primary-600 dark:border-primary-900'
	let inactiveClass = 'bg-gray-600/30 dark:bg-gray-900/50 text-white border-primary-400/10 dark:border-primary-50/10'
	let linkClass     = 'flex items-center justify-between !py-1 px-4 rounded-full gap-2 border'

	const {
		class: _class, ...restWithoutClass
	} = $$restProps

</script>

<Button
	class="{linkClass} {active ? activeClass : inactiveClass} {$$restProps.class}"
	{blank}
	color="none"
	{href}
	{...restWithoutClass}
>
	<Fa
		class="{title && title != '' ? 'p-2 !h-7 -ml-3 !w-7 rounded-full bg-gray-50/10' : ''}"
		icon="{icon}"
	/>

	{#if title}
		{title}
	{/if}

</Button>
