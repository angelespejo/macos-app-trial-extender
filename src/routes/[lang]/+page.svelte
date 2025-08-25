<script lang="ts">

	import {
		DATA,
		PAGE_ID,
	} from '$const'
	import { app } from '$core'
	import {
		Btn,
		TableCompatibleVersion,
		faCheck,
		faRefresh,
		faRobot,
	} from '$lib'

	const dotClass  = ( active:boolean ) => `ml-2 w-1 h-1 p-1 flex rounded-full ${active ? 'shadow-dot bg-green-600 dark:bg-green-400 shadow-green-500/90' : 'bg-gray-500 dark:bg-gray-200'}`
	const linkClass = 'text-primary-800 dark:text-primary-50 underline italic'
	const btnClass  = 'text-primary-50 dark:text-primary-900'

</script>

<div class="flex flex-col items-start text-start justify-center">
	<div class="flex items-center gap-4">
		<img
			alt="logo"
			height="200"
			src={app.settings.APP_LOGO_SRC}
			width="200"
		/>
		<div class="items-start flex flex-col">

			<h1>{DATA.PKG.extra.productName}</h1>
			<h2 class="italic">({DATA.PKG.extra.productNameLong})</h2>

			<div class="mt-4 flex flex-cols gap-2">
				<p class="!m-0  flex items-center text-xs">
					<span class="opacity-80">{app.t( 'common.settings.automateTitle' )}</span>
					<span class="{dotClass( app.settings.automate.current )}"></span>
				</p>
				<p class="!m-0 flex items-center text-xs">
					<span class="opacity-80">{app.t( 'common.settings.notsTitle' )}</span>
					<span class="{dotClass( app.settings.notification.current )}"></span>
				</p>
			</div>

		</div>
	</div>

	<p>
		{app.t( 'common.info.shortDesciption' )}
		<!-- <b>{DATA.PKG.extra.productName}</b> is an application that allows you to reset the trial period of native macos applications such as <b>{ffcut.name}</b> or <b>{lp.name}</b>. -->
	</p>
	<p>
		{app.t( 'common.info.purposes' )}
		<Btn
			class={[ linkClass, 'pl-2' ]}
			color="none"
			href={PAGE_ID.info}
		>
			{app.t( 'common.btns.readMore' )}
		</Btn>
	</p>
	<div class="my-4 flex flex-col w-full gap-2">
		<Btn
			class={btnClass}
			disabled={app.reset.isRemoving}
			icon={app.reset.isRemoving ? faCheck : faRefresh}
			onclick={() => app.reset.removeFiles()}
		>
			{#if app.reset.isRemoving}
				{app.t( 'common.home.resetBtnSucces' )}
			{:else}
				{app.t( 'common.home.resetBtn' )}
			{/if}
		</Btn>
		<Btn
			class={btnClass}
			color="dark"
			icon={faRobot}
			onclick={() => app.settings.automate.current = !app.settings.automate.current}
		>
			{#if !app.settings.automate.current}
				{app.t( 'common.home.automationBtn' )}
			{:else}
				{app.t( 'common.home.automationBtnDesactive' )}
			{/if}
		</Btn>
	</div>

	<div class="flex flex-col w-full my-4">
		<div class="flex flex-row w-full justify-start gap-2 mb-4">

			<Btn
				class={linkClass}
				color="none"
				href={PAGE_ID.info}
			>
				{app.t( 'common.info.aboutTitle' )}
			</Btn>

			<Btn
				class={linkClass}
				color="none"
				href={PAGE_ID.info + '#' + PAGE_ID.infoHow}
			>
				{app.t( 'common.info.howTitle' )}
			</Btn>

			<Btn
				class={linkClass}
				color="none"
				href={PAGE_ID.settings}
			>
				{app.t( 'common.settings.title' )}
			</Btn>

		</div>
		<div class="my-4">
			<p class="ml-0 text-xs">
				<b>{app.t( 'common.home.tableTitle' )}</b>
			</p>
			<TableCompatibleVersion />
		</div>

		<div class="flex justify-end mb-2">
			<Btn
				class={linkClass}
				color="none"
				href={PAGE_ID.info + '#' + PAGE_ID.infoTests}
			>
				View tests
			</Btn>
			<Btn
				class={linkClass}
				blank={true}
				color="none"
				href={DATA.PKG.bugs.url}
			>
				{app.t( 'common.btns.foundIssues' )}
			</Btn>
		</div>

	</div>
</div>
