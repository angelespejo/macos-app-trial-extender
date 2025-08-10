<script lang="ts">

	import { Select } from 'flowbite-svelte'

	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	import type { Writable } from 'svelte/store'

	export let t
	export let locales
	export let locale: Writable<String>

	export let placeholder = ''

	const onChange = ( { target }: Event ) => {

		if ( target && 'value' in target && typeof target.value === 'string' ) {

			goto( `/${target.value}${route}` )
			locale.set( target.value )

		}

	}

	$: ( { route } = $page.data )

</script>

<Select
	class="py-1 text-xs"
	{placeholder}
	size="sm"
	on:change={onChange}
>
	{#each $locales as lc}
		<option
			selected="{lc === $locale}"
			value="{lc}"
		>   {$t( `lang.${lc}` )}
		</option>
	{/each}
</Select>
