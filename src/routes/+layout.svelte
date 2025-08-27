<script lang="ts">

	import { m } from '$i18n/messages'

	import {
		DATA,
		PAGE_ID,
	} from '$const'
	import { app } from '$core'
	import {
		BtnSidebar,
		ErrorContent,
		ICON_CLASS_FUNDING,
		ICON_CLASS_HOME,
		ICON_CLASS_INFO,
		ICON_CLASS_TOOLS,
	} from '$lib'
	import '$styles'

	let { children } = $props()

	app.window.addViewTransition()

</script>

<div
	class="app"
	data-theme={app.settings.theme.current}
>
	<header class="header">
		<nav class="w-full">
			<div class="flex items-center gap-2 mt-3">
				<img
					alt="logo"
					src={app.settings.APP_LOGO_SRC}
					width="30"
				/>
				<h3>{DATA.PKG.extra.productName}</h3>
			</div>
			<div class="py-4 flex flex-col w-full [&>button]:w-full items-start gap-2 [&>a]:w-full">
				<BtnSidebar
					active={app.page.current.home}
					href="/"
					icon={ICON_CLASS_HOME}
					title={m['tray.home']()}
				/>
				<BtnSidebar
					active={app.page.current.settings}
					href={PAGE_ID.settings}
					icon={ICON_CLASS_TOOLS}
					title={m['settings.title']()}
				/>
				<BtnSidebar
					active={app.page.current.info}
					href={PAGE_ID.info}
					icon={ICON_CLASS_INFO}
					title={m['info.title']()}
				/>
			</div>
		</nav>
		<div class="flex w-full items-center justify-end gap-2">
			<BtnSidebar
				class="hover:!bg-red-500/50"
				blank={true}
				href={DATA.PKG.funding.url}
				icon={ICON_CLASS_FUNDING}
			/>
		</div>
	</header>
	<main class="content">
		{#await app.init()}
			<section class="flex flex-col h-full justify-center items-center ">
				<span class="spinner"></span>
			</section>
		{:then _}
			<section class="w-full h-full overflow-y-scroll p-2">
				<svelte:boundary>
					{@render children?.()}
					{#snippet pending()}
						<section class="flex flex-col h-full justify-center items-center"><span class="spinner"></span></section>
					{/snippet}
					{#snippet failed( e )}
						<ErrorContent title="💥 Page Error 💥">
							<p>{e instanceof Error ? e.message : 'Unexpected error'}</p>
						</ErrorContent>
					{/snippet}
				</svelte:boundary>
			</section>
		{:catch e}
			<ErrorContent title="💥 Init App Error 💥">
				<p>{e instanceof Error ? e.message : 'Unexpected error'}</p>
			</ErrorContent>
		{/await}
		<footer class="footer">
			<p>v{DATA.PKG.version}</p>
		</footer>
	</main>
</div>

