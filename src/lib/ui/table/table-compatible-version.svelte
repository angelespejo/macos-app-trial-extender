<script lang="ts">

	import { DATA } from '$const'
	import { t } from '$i18n'
	import { TableFull } from '$lib'

</script>

<TableFull
	items={{
		head : [ $t( 'common.home.tableSoftware' ), $t( 'common.home.tableFrom' ) ],
		cell : [ [ 'Final Cut Pro', DATA.APP_INFORMATION.finalcut.firstCompatibleVersion ], [ 'Logic Pro', DATA.APP_INFORMATION.logicpro.firstCompatibleVersion ] ],
	}}
/>

