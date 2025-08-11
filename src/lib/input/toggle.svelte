<script lang="ts">
	import { Toggle } from 'flowbite-svelte'

	export let checked = false
</script>
<Toggle
	bind:checked
	{...$$restProps}
/>
