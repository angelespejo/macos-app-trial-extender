<script lang="ts">

	import { app } from '$core'

</script>

<select
	class="select"
	bind:value={app.locale}
>
	{#each app.locales as lc}
		<option
			selected={lc === app.locale}
			value={lc}
		>   {app.t( `lang.${lc}` )}
		</option>
	{/each}
</select>
