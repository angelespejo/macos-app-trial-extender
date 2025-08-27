<script lang="ts">

	import { m } from '$i18n/messages'
	import Dot from '$lib/ui/dot.svelte'

	import {
		DATA,
		PAGE_ID,
	} from '$const'
	import { app } from '$core'
	import {
		Btn,
		ICON_CLASS_AUTOMATE,
		ICON_CLASS_CHECK,
		ICON_CLASS_RESET,
		TableCompatibleVersion,
	} from '$lib'

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
					<span class="opacity-80">{m['settings.automateTitle']()}</span>
					<Dot active={app.settings.automate.current} />
				</p>
				<p class="!m-0 flex items-center text-xs">
					<span class="opacity-80">{m['settings.notsTitle']()}</span>
					<Dot active={app.settings.notification.current} />
				</p>
			</div>

		</div>
	</div>

	<p>
		{m['info.shortDesciption']()}
		<!-- <b>{DATA.PKG.extra.productName}</b> is an application that allows you to reset the trial period of native macos applications such as <b>{ffcut.name}</b> or <b>{lp.name}</b>. -->
	</p>
	<p>
		{m['info.purposes']()}
		<Btn
			class={[ linkClass, 'pl-2' ]}
			color="none"
			href={PAGE_ID.info}
		>
			{m['btns.readMore']()}
		</Btn>
	</p>
	<div class="my-4 flex flex-col w-full gap-2">
		<Btn
			class={btnClass}
			disabled={app.reset.isRemoving}
			icon={{ src: app.reset.isRemoving ? ICON_CLASS_CHECK : ICON_CLASS_RESET }}
			onclick={() => app.reset.removeFiles()}
		>
			{#if app.reset.isRemoving}
				{m['home.resetBtnSucces']()}
			{:else}
				{m['home.resetBtn']()}
			{/if}
		</Btn>
		<Btn
			class={btnClass}
			color="dark"
			icon={{ src: ICON_CLASS_AUTOMATE }}
			onclick={() => app.settings.automate.current = !app.settings.automate.current}
		>
			{#if !app.settings.automate.current}
				{m['home.automationBtn']()}
			{:else}
				{m['home.automationBtnDesactive']()}
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
				{m['info.aboutTitle']()}
			</Btn>

			<Btn
				class={linkClass}
				color="none"
				href={PAGE_ID.info + '#' + PAGE_ID.infoHow}
			>
				{m['info.howTitle']()}
			</Btn>

			<Btn
				class={linkClass}
				color="none"
				href={PAGE_ID.settings}
			>
				{m['settings.title']()}
			</Btn>

		</div>
		<div class="my-4">
			<p class="ml-0 text-xs">
				<b>{m['home.tableTitle']()}</b>
			</p>
			<TableCompatibleVersion />
		</div>

		<div class="flex justify-end my-4">
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
				{m['btns.foundIssues']()}
			</Btn>
		</div>

	</div>
</div>
