<script lang="ts">
	import { onMount } from 'svelte'

	import {
		DATA,
		PAGE_ID,
	} from '$const'
	import { app } from '$core'
	import {
		BtnSidebar,
		ErrorContent,
		faGears,
		faHeart,
		faHouse,
		faInfo,
	} from '$lib'
	import '$styles'

	let { children } = $props()

	app.window.addViewTransition()
	onMount( async () => {

		await app.init()

	} )

</script>

<div
	class="h-screen w-full flex flex-row items-center justify-between bg-primary-950 selection:bg-primary-800 selection:text-primary-50 font-sans"
	data-theme={app.settings.theme.current}
>
	<header class="h-full w-full max-w-[200px] flex flex-col items-start justify-between py-8 px-4">
		<nav class="w-full">
			<div class="flex items-center gap-2 mt-3">
				<img
					alt="logo"
					src={app.settings.APP_LOGO_SRC}
					width="40"
				/>
				<h3>{DATA.PKG.extra.productName}</h3>
			</div>
			<div class="py-4 flex flex-col w-full [&>button]:w-full items-start gap-2 [&>a]:w-full">
				<BtnSidebar
					active={app.window.page.isOn( '' )}
					href="/"
					icon={faHouse}
					title={app.t( 'common.home.title' )}
				/>
				<BtnSidebar
					active={app.window.page.isOn( PAGE_ID.settings )}
					href={PAGE_ID.settings}
					icon={faGears}
					title={app.t( 'common.settings.title' )}
				/>
				<BtnSidebar
					active={app.window.page.isOn( PAGE_ID.info )}
					href={PAGE_ID.info}
					icon={faInfo}
					title={app.t( 'common.info.title' )}
				/>
			</div>
		</nav>
		<div class="flex w-full items-center justify-end gap-2">
			<BtnSidebar
				class="hover:!bg-red-500/50"
				blank={true}
				href={DATA.PKG.funding.url}
				icon={faHeart}
			/>
		</div>
	</header>
	<main class="w-full h-screen flex flex-col p-8 bg-primary-800/20 rounded-s-2xl shadow-primary-700/10 backdrop-blur-md">
		<section class="w-full h-full overflow-y-scroll p-2">
			<svelte:boundary>

				{@render children?.()}
				{#snippet pending()}
					<div class="flex flex-col h-full justify-center items-center">...loading</div>
				{/snippet}
				{#snippet failed( e )}
					<ErrorContent title="💥 Page Error 💥">
						<p>{e instanceof Error ? e.message : 'Unexpected error'}</p>
					</ErrorContent>
				{/snippet}
			</svelte:boundary>
		</section>
		<footer class="flex justify-end">
			<p class="opacity-50 !m-0 !mt-2 text-xs">v{DATA.PKG.version}</p>
		</footer>
	</main>
</div>

