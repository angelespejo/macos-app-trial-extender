<script lang="ts">

	import type { Snippet } from 'svelte'

	import {
		Btn,
		ICON_CLASS_INFO,
		Icon,
		type IconProps,
	} from '$lib'

	let {
		icon,
		title = '',
		activeDesc = $bindable( false ),
		description,
		children,
	}: {
		icon?        : IconProps | string
		title?       : string
		activeDesc?  : boolean
		description? : Snippet
		children?    : Snippet
	} = $props()

</script>

<div class="flex flex-col w-full p-4 bg-primary-800/40 hover:bg-primary-800/60 hover:shadow-lg theme-radius">
	<div class="flex justify-between w-full">
		<div class="text-primary-50 flex items-center gap-2">
			{#if icon}
				<div class="p-2 rounded-full bg-primary-950/50 flex justify-center items-center w-[30px] h-[30px]">
					{#if typeof icon !== 'string'}
						<Icon {...icon} />
					{:else}
						<img
							alt={title}
							src={icon}
						/>
					{/if}
				</div>
			{/if}
			{title}
		</div>
		<div class="flex flex-row gap-1 items-center">
			{#if description}
				<Btn
					class={[ `!rounded-full flex items-center justify-center mr-1 text-gray-50 !p-2` ]}
					color="dark"
					data-active={activeDesc ? 'true' : undefined}
					icon={{
						src   : ICON_CLASS_INFO,
						class : '!m-0 w-2 h-2',
					}}
					onclick={() => activeDesc = !activeDesc}
					shadow={false}
				/>
			{/if}

			{@render children?.()}

		</div>
	</div>
	{#if activeDesc}
		<p class="mt-4 text-xs">
			{@render description?.()}
		</p>
	{/if}

</div>
