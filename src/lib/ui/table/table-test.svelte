<script lang="ts">

	import TableAppInfo from './table-app-info.svelte'

	import { DATA } from '$const'

	const APP_INFO = DATA.APP_INFORMATION
</script>

<p class="ml-0 text-xs">
	Final Cut User-tested versions
</p>

<TableAppInfo data={APP_INFO.finalcut} />

<p class="ml-0 text-xs">
	Logic Pro User-tested versions
</p>

<TableAppInfo data={APP_INFO.logicpro} />
