<script lang="ts">

	import type { Snippet } from 'svelte'

	import { DATA } from '$const'
	import { app } from '$core'
	import {
		Btn,
		faBug,
		faHouse,
	} from '$lib'

	let {
		children, title,
	}: {
		children? : Snippet
		title?    : string
	} = $props()

</script>

<div class="flex flex-col h-full justify-center items-center">
	<img
		alt="logo"
		src={app.settings.APP_LOGO_SRC}
		width="100"
	/>
	<h1>{title}</h1>

	{@render children?.()}
	<div class="gap-2 flex flex-row mt-8">
		<Btn
			href="/"
			icon={faHouse}
		>
			{app.t( 'common.btns.goHome' )}
		</Btn>
		<Btn
			blank={true}
			color="dark"
			href={DATA.PKG.funding.url}
			icon={faBug}
		>
			Bugs
		</Btn>
	</div>
</div>

