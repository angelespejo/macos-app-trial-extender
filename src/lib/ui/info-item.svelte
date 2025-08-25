<script lang="ts">

	import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'

	import {
		Badge,
		Btn,
		Fa,
	} from '$lib'

	let {
		key = '',
		value = '',
		href,
		icon,
		image,
	}: {
		key?   : string
		value? : string
		href?  : string
		icon?  : IconDefinition
		image? : string
	} = $props()

	let classDiv = 'flex !justify-between w-full p-2 text-xs text-primary-900 dark:text-primary-50 bg-gray-300/40 dark:bg-gray-800/40 hover:bg-gray-300/60 hover:dark:bg-gray-800/60 hover:shadow-lg !rounded-lg'

</script>

{#snippet content()}
	<span class="font-bold flex items-center gap-1">
		{#if icon}
			<Fa
				class="opacity-50"
				{icon}
			/>
		{/if}
		{#if image}
			<img
				class="w-[40px] h-[40px] rounded-full bg-primary-950/20 object-contain"
				alt={key}
				src={image}
			/>
		{/if}
		{key}
	</span>
	<Badge>{value}</Badge>
{/snippet}

{#if href}
	<Btn
		class={classDiv}
		blank={true}
		color="none"
		{href}
	>
		{@render content()}
	</Btn>
{:else}
	<div class={classDiv}>
		{@render content()}
	</div>
{/if}
