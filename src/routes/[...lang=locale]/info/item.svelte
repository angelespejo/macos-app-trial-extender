<script lang="ts">

	import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'

	import {
		Badge,
		Btn,
		Fa,
	} from '$lib'

	export let key: string = ''
	export let value: string = ''
	export let href: string | undefined = undefined
	export let icon: IconDefinition | undefined = undefined

	let classDiv = 'flex justify-between w-full p-2 text-xs text-primary-900 dark:text-primary-50 bg-gray-300/40 dark:bg-gray-800/40 hover:bg-gray-300/60 hover:dark:bg-gray-800/60 hover:shadow-lg rounded-lg'

</script>

{#if href}
	<Btn
		class="{classDiv}"
		blank={true}
		color="none"
		{href}
	>

		<span class="font-bold flex items-center gap-1">
			{#if icon}
				<Fa
					class="opacity-50"
					{icon}
				/>
			{/if}
			{key}
		</span>
		<Badge>{value}</Badge>
	</Btn>
{:else}
	<div class="{classDiv}">
		<span class="font-bold flex items-center gap-1">
			{#if icon}
				<Fa
					class="opacity-50"
					{icon}
				/>
			{/if}
			{key}
		</span>
		<Badge>{value}</Badge>
	</div>
{/if}
