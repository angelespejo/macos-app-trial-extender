<script lang="ts">

	import {
		TableBodyCell,
		TableBodyRow,
		TableHeadCell,
	} from 'flowbite-svelte'

	import Body      from './body.svelte'
	import Head      from './head.svelte'
	import Root      from './root.svelte'

	type Items = {
		head : string[]
		cell : ( string[] )[]
	}
	export let items: Items

</script>

<Root>

	<Head>
		{#each items.head as head}
			<TableHeadCell>{head}</TableHeadCell>
		{/each}
	</Head>

	<Body>
		{#each items.cell as row}
			<TableBodyRow>
				{#each row as cell}
					<TableBodyCell>{cell}</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</Body>

</Root>
