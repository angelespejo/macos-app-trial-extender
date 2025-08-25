<script lang="ts">

	import { TableHead } from 'flowbite-svelte'

	import type { Snippet } from 'svelte'

	let { children }: { children?: Snippet } = $props()

</script>

<TableHead class="!bg-primary-500/30 dark:!bg-primary-700/20">
	{@render children?.()}
</TableHead>
