<script lang="ts">

	import TableAppInfo from './table-app-info.svelte'
	// import { page } from '$app/stores'

	import { APP_INFO } from '$const'
	import { P } from '$lib'

</script>

<P
	class="ml-0"
	size="sm"
>
	Final Cut User-tested versions
</P>

<TableAppInfo data={APP_INFO.finalcut} />

<P
	class="ml-0"
	size="sm"
>
	Logic Pro User-tested versions
</P>

<TableAppInfo data={APP_INFO.logicpro} />
