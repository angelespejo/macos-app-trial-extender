<script lang="ts">

	import { Table } from 'flowbite-svelte'

</script>

<Table
	classes={{ div: 'w-full mb-8 relative overflow-x-auto' }}
	shadow
>
	<slot />
</Table>
