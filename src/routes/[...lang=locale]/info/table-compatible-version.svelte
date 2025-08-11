<script lang="ts">

	import { page } from '$app/stores'

	import { APP_INFO } from '$const'
	import { TableFull } from '$lib'

	const { t } = $page.data
</script>

<TableFull
	items={{
		head : [ $t( 'common.home.tableSoftware' ), $t( 'common.home.tableFrom' ) ],
		cell : [ [ 'Final Cut Pro', APP_INFO.finalcut.firstCompatibleVersion ], [ 'Logic Pro', APP_INFO.logicpro.firstCompatibleVersion ] ],
	}}
/>

