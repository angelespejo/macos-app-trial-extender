<script lang="ts">

	import Logo from '../../assets/logo.png'
	import { page } from '$app/stores'

	import {
		Btn,
		H,
		P,
		TableFull,
		faCheck,
		faRefresh,
		faRobot,
	} from '$lib'

	const ffcut     = $page.data.pkg.extra.software.finalcut
	const lp        = $page.data.pkg.extra.software.logicPro
	const softwares = [ ffcut, lp ]
	const pageIds   = $page.data.store.pagesIds
	const {
		automate, notification,
	} = $page.data.store

	const dotClass  = ( active:boolean ) => `ml-2 w-1 h-1 p-1 flex rounded-full ${active ? 'shadow-dot bg-green-600 dark:bg-green-400 shadow-green-500/90' : 'bg-gray-500 dark:bg-gray-200'}`
	const linkClass = 'text-gray-800 dark:text-gray-50 underline italic'
	const btnClass  = 'text-primary-50 dark:text-primary-900'

	let isClickedReset         = false
	const clickedResetFunction = () => {

		isClickedReset = true
		setTimeout( () => isClickedReset = false, 2000 )

	}
	const { t } = $page.data
</script>

<div class="flex flex-col items-start text-start justify-center ">
	<div class="flex items-center">
		<img
			alt="logo"
			src={Logo}
			width="200"
		/>
		<div class="items-start flex flex-col">

			<H tag="h1">{$page.data.pkg.extra.productName}</H>
			<H
				class="italic"
				tag="h2"
			>({$page.data.pkg.extra.productNameLong})</H>

			<div class="mt-4 flex flex-cols gap-2">
				<P
					class="!m-0  flex items-center"
					size="sm"
				>
					<span class="opacity-80">{$t( 'common.settings.automateTitle' )}</span>
					<span class="{dotClass( $automate )}"></span>
				</P>
				<P
					class="!m-0 flex items-center"
					size="sm"
				>
					<span class="opacity-80">{$t( 'common.settings.notsTitle' )}</span>
					<span class="{dotClass( $notification )}"></span>
				</P>
			</div>

		</div>
	</div>

	<P>
		{$t( 'common.info.shortDesciption' )}
		<!-- <b>{$page.data.pkg.extra.productName}</b> is an application that allows you to reset the trial period of native macos applications such as <b>{ffcut.name}</b> or <b>{lp.name}</b>. -->
	</P>
	<P>
		{$t( 'common.info.purposes' )}
		<Btn
			class="{linkClass} pl-2"
			color="none"
			href={pageIds.info}
		>
			{$t( 'common.btns.readMore' )}
		</Btn>
	</P>
	<div class="my-4 flex flex-col w-full gap-2">
		<Btn
			class="{btnClass}"
			disabled={isClickedReset}
			icon={isClickedReset ? faCheck : faRefresh}
			onClick={async () => {

				await $page.data.resetTrial()
				clickedResetFunction()

			}}
		>
			{#if isClickedReset}
				{$t( 'common.home.resetBtnSucces' )}
			{:else}
				{$t( 'common.home.resetBtn' )}
			{/if}
		</Btn>
		<Btn
			class="{btnClass}"
			color="dark"
			icon={faRobot}
			onClick={() => automate.toggle()}
		>
			{#if !$automate}
				{$t( 'common.home.automationBtn' )}
			{:else}
				{$t( 'common.home.automationBtnDesactive' )}
			{/if}
		</Btn>
	</div>

	<div class="flex flex-col w-full my-4">
		<div class="flex flex-row w-full justify-start gap-2 mb-4">

			<Btn
				class="{linkClass}"
				color="none"
				href={pageIds.info}
			>
				{$t( 'common.info.aboutTitle' )}
			</Btn>

			<Btn
				class="{linkClass}"
				color="none"
				href={pageIds.info + '#' + pageIds.infoHow}
			>
				{$t( 'common.info.howTitle' )}
			</Btn>

			<Btn
				class="{linkClass}"
				color="none"
				href={pageIds.settings}
			>
				{$t( 'common.settings.title' )}
			</Btn>

		</div>
		<div class="my-4">
			<P
				class="ml-0"
				size="sm"
			>
				<b>{$t( 'common.home.tableTitle' )}</b>
			</P>
			<TableFull
				items={{
					head : [
						$t( 'common.home.tableSoftware' ),
						$t( 'common.home.tableFrom' ),
						$t( 'common.home.tableTo' ),
					],
					cell : softwares.map( d => [
						d.name,
						d.fromVersion,
						d.testedVersion.to,
					] ),
				}}
			/>
		</div>

		<div class="flex justify-end mb-2">
			<Btn
				class="{linkClass}"
				blank={true}
				color="none"
				href={$page.data.pkg.bugs.url}
			>
				{$t( 'common.btns.foundIssues' )}
			</Btn>
		</div>

	</div>

</div>
