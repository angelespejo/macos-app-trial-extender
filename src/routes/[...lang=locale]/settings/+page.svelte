<script lang="ts">

	import Config from './config.svelte'
	import { page } from '$app/stores'

	import {
		Btn,
		LangSelect,
		Section,
		faCheck,
		faRefresh,
		faRobot,
	} from '$lib'

	const {
		t, locale, locales, store,
	} = $page.data
	const {
		notification, automate,
	} = store
	let isClickedReset         = false
	const clickedResetFunction = () => {

		isClickedReset = true
		setTimeout( () => isClickedReset = false, 2000 )

	}
</script>

<Section title="">

	<Config
		config={false}
		icon={faRefresh}
		title={$t( 'common.settings.extendTitle' )}
	>
		<div slot="value">
			<Btn
				class="text-primary-900"
				disabled={isClickedReset}
				icon={isClickedReset ? faCheck : undefined}
				onClick={async () => {

					await $page.data.resetTrial()
					clickedResetFunction()

				}}
			>
				{#if isClickedReset}
					{$t( 'common.settings.extendBtnSuccess' )}
				{:else}
					{$t( 'common.settings.extendBtn' )}
				{/if}
			</Btn>
		</div>
	</Config>

	<Config
		config={false}
		icon={faRobot}
		title={$t( 'common.settings.automateTitle' )}
	>
		<div slot="value">
			<Btn
				class="{$automate ? 'text-primary-900' : 'text-primary-100'}"
				color="{$automate ? 'primary' : 'dark'}"
				onClick={() => automate.toggle()}
			>
				{#if $automate}
					{$t( 'common.settings.automateBtnDeactivate' )}
				{:else}
					{$t( 'common.settings.automateBtnActivate' )}
				{/if}
			</Btn>
		</div>

		<div slot="desc">
			{$t( 'common.settings.automateDescription' )}
		</div>
	</Config>

</Section>
<Section title={$t( 'common.settings.generalTitle' )}>
	<Config
		config={false}
		title={$t( 'common.settings.notsTitle' )}
		bind:value={$notification}
	>
		<div slot="desc">
			{$t( 'common.settings.notsDescription' )}
		</div>
	</Config>
	<!-- <Config
		config={false}
		title={$t( 'common.settings.autostartTitle' )}
		bind:value={$autostart}
	>
		<div slot="desc">
			{$t( 'common.settings.autostartDescription' )}
		</div>
	</Config> -->
	<Config
		config={false}
		title={$t( 'common.settings.languageTitle' )}
	>
		<div slot="value">
			<LangSelect
				{locale}
				{locales}
				{t}
			/>
		</div>

	</Config>
</Section>
