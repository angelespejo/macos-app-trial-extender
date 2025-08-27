<script lang="ts">

	import { page } from '$app/state'

	import { ErrorContent } from '$lib'

</script>

<div class="flex flex-col h-full justify-center items-center">
	<ErrorContent title={page.status === 404 ? 'Page Not Found' : page.error?.message || 'Unexpected error'}>
		<h2>Error: {page.status}</h2>
	</ErrorContent>
</div>

