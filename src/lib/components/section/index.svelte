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
		class: Klass,
		...rest
	}: SectionProps = $props()

</script>

<div
	class={[ 'section', Klass ]}
	{...rest}
>
	<button
		class="section--header"
		onclick={() => accordeonValue = accordeonValue ? false : true}
		type="button"
	>
		<h2>{title}</h2>
		{#if accordeon}
			<Icon src={accordeonValue ? ICON_CLASS_UP : ICON_CLASS_DOWN} />
		{/if}
	</button>
	<div class="section--content">
		{#if !accordeon}
			{@render children?.()}
		{:else if accordeon && accordeonValue}
			{@render children?.()}
		{/if}
	</div>
</div>
