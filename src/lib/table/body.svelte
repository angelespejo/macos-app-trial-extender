<script lang="ts">

	import { TableBody } from 'flowbite-svelte'

</script>

<TableBody tableBodyClass="[&>tr]:bg-primary-500/20 [&>tr]:dark:bg-primary-800/20">
	<slot />
</TableBody>
