<script lang="ts">

	import { m } from '$i18n/messages'

	import { DATA } from '$const'
	import { TableFull } from '$lib'

</script>

<TableFull
	items={{
		head : [ m['home.tableSoftware'](), m['home.tableFrom']() ],
		cell : [ [ 'Final Cut Pro', DATA.APP_INFORMATION.finalcut.firstCompatibleVersion ], [ 'Logic Pro', DATA.APP_INFORMATION.logicpro.firstCompatibleVersion ] ],
	}}
/>

