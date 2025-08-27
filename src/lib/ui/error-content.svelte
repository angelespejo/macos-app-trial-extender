<script lang="ts">

	import { m } from '$i18n/messages'

	import type { Snippet } from 'svelte'

	import { DATA } from '$const'
	import { app } from '$core'
	import {
		Btn,
		ICON_CLASS_HOME,
		ICON_CLASS_ISSUES,
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
			icon={{ src: ICON_CLASS_HOME }}
		>
			{m['btns.goHome']()}
		</Btn>
		<Btn
			blank={true}
			color="dark"
			href={DATA.PKG.bugs.url}
			icon={{ src: ICON_CLASS_ISSUES }}
		>
			Report issue
		</Btn>
	</div>
</div>

