<script lang="ts">

	import type { Snippet } from 'svelte'

	import {
		Btn,
		Fa,
		type IconDefinition,
		Toggle,
		faInfo,
	} from '$lib'

	let {
		icon,
		title = '',
		activeDesc = false,
		config = true,
		description,
		children,
		id,
		value = $bindable( true ),
	}: {
		id           : string
		icon?        : IconDefinition | string
		title?       : string
		activeDesc?  : boolean
		description? : Snippet
		children?    : Snippet
		config?      : boolean
		value?       : boolean
	} = $props()

	let active     = $state( false )
	const btnClass = ( active: boolean ) =>
		`[&>svg]:mr-0 mr-1 text-gray-50 ${!active ? '!bg-gray-500/50 !dark:bg-gray-700/50' : '!bg-gray-600/50 dark:!bg-gray-600'}`

</script>

<div class="flex flex-col w-full p-4 bg-gray-200/60 dark:bg-gray-800/40 hover:bg-gray-200/80 hover:dark:bg-gray-800/60 hover:shadow-lg rounded-lg">
	<div class="flex justify-between w-full">
		<div class="text-primary-900 dark:text-primary-50 flex items-center gap-2">
			{#if icon}
				<div class="p-2 rounded-full bg-primary-400/20 dark:bg-primary-700/20">
					{#if typeof icon !== 'string'}
						<Fa
							class="w-[20px] h-[20px]"
							{icon}
						/>
					{:else}
						<img
							class="w-[20px] h-[20px]"
							alt="{title}"
							src="{icon}"
						/>
					{/if}
				</div>
			{/if}
			{title}
		</div>
		<div class="flex flex-row gap-2 items-center">
			{#if description}
				<Btn
					class={btnClass( activeDesc )}
					color="dark"

					icon={faInfo}
					onclick={() => activeDesc = !activeDesc}
					shadow={false}
				/>
			{/if}
			{#if config}
				<Btn
					class={btnClass( active )}
					color="dark"
					icon={faInfo}
					onclick={() => active = !active}
					shadow={false}
				/>
			{/if}
			{#if children}
				{@render children?.()}
			{:else}
				<Toggle
					id={id}
					bind:checked={value}
				/>
			{/if}
		</div>
	</div>
	{#if activeDesc}
		<p class="mt-4 text-xs">
			{@render description?.()}
		</p>
	{/if}
	{#if active && config}
		<div class="bg-gray-800/50 p-2 mt-4 rounded-lg">
			{@render children?.()}
		</div>
	{/if}

</div>
