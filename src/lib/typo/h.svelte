<script lang="ts">
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1'

	const pClass = {
		h1 : 'font-bold text-2xl sm:text-3xl md:text-5xl text-primary-800 dark:text-primary-50',
		h2 : 'font-extrabold text-xl text-primary-800 dark:text-primary-50',
		h3 : 'font-extrabold text-[25px] text-primary-900 dark:text-primary-50',
		h4 : 'font-extrabold text-[25px] text-gray-900 dark:text-gray-200',
		h5 : 'font-extrabold text-[25px] text-gray-900 dark:text-gray-200',
		h6 : 'font-extrabold text-[25px] text-gray-900 dark:text-gray-200',
	}
</script>

{#if tag === 'h1'}
	<h1
		{...$$restProps}
		class="{pClass[tag]} {$$restProps.class ?? ''}"
	>
		<slot />
	</h1>
{:else if tag === 'h2'}
	<h2
		{...$$restProps}
		class="{pClass[tag]} {$$restProps.class ?? ''}"
	>
		<slot />
	</h2>
{:else if tag === 'h3'}
	<h3
		{...$$restProps}
		class="{pClass[tag]} {$$restProps.class ?? ''}"
	>
		<slot />
	</h3>
{:else if tag === 'h4'}
	<h4
		{...$$restProps}
		class="{pClass[tag]} {$$restProps.class ?? ''}"
	>
		<slot />
	</h4>
{:else if tag === 'h5'}
	<h5
		{...$$restProps}
		class="{pClass[tag]} {$$restProps.class ?? ''}"
	>
		<slot />
	</h5>
{:else if tag === 'h6'}
	<h6
		{...$$restProps}
		class="{pClass[tag]} {$$restProps.class ?? ''}"
	>
		<slot />
	</h6>
{/if}
