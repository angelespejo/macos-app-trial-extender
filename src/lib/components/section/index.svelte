<script lang="ts">

	import type { SectionProps } from './types'

	import {
		ICON_CLASS_DOWN,
		ICON_CLASS_UP,
		Icon,
	} from '$lib'

	let {
		title,
		accordeon = false,
		accordeonValue = false,
		children,
		...rest
	}: SectionProps = $props()

</script>

<div {...rest}>
	<button
		class="w-full flex justify-between"
		onclick={() => accordeonValue = accordeonValue ? false : true}
		type="button"
	>
		<h2>{title}</h2>
		{#if accordeon}
			<Icon
				class="opacity-25 text-primary-50"
				src={accordeonValue ? ICON_CLASS_UP : ICON_CLASS_DOWN}
			/>
		{/if}
	</button>
	<div class="my-2 flex flex-col gap-2">
		{#if !accordeon}
			{@render children?.()}
		{:else if accordeon && accordeonValue}
			{@render children?.()}
		{/if}
	</div>
</div>
