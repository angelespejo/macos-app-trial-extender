<script lang="ts">

	import type { SelectProps } from './types'

	let {
		id,
		value = $bindable( '' ),
		options,
		class: Klass,
		placeholder,
		...rest
	}: SelectProps = $props()

</script>

<select
	class={[ 'select', Klass ]}
	bind:value={value}
	{...rest}
>
	{#if placeholder}
		<option
			disabled
			selected
			value=""
		>
			{placeholder}
		</option>
	{/if}

	{#each options as opt ( opt.value )}
		<option
			value={opt.value}
			{...opt.attr}
		>   {opt.text || opt.value}
		</option>
	{/each}
</select>
