<script lang="ts">
	import { m } from '$i18n/messages'

	import { app } from '$core'
</script>

<select
	class="select"
	bind:value={app.page.locale.current}
>
	{#each app.page.locales as lc}
		<option
			selected={lc === app.page.locale.current}
			value={lc}
		>   {m[`lang.${lc}`]()}
		</option>
	{/each}
</select>
