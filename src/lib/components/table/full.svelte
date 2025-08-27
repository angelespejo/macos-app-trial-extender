<script lang="ts">

	import Body      from './body.svelte'
	import Data from './data.svelte'
	import Head      from './head.svelte'
	import Root      from './root.svelte'
	import Row from './row.svelte'

	type Items = {
		head : string[]
		cell : ( string[] )[]
	}
	let { items }: { items: Items } = $props()

</script>

<Root>
	<Head>
		<Row>
			{#each items.head as head}
				<Data>{head}</Data>
			{/each}
		</Row>
	</Head>

	<Body>
		{#each items.cell as row}
			<Row>
				{#each row as cell}
					<Data>{cell}</Data>
				{/each}
			</Row>
		{/each}
	</Body>

</Root>
