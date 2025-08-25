<script lang="ts">

	import type { SectionProps } from './types'

	import {
		Fa,
		faChevronDown,
		faChevronUp,
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
			<Fa
				class="opacity-25 text-primary-800 dark:text-primary-50"
				icon={accordeonValue ? faChevronUp : faChevronDown}
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
