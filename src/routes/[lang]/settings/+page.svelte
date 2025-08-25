<script lang="ts">
	import { APP_THEME } from '$const'
	import { app } from '$core'
	import {
		Btn,
		ConfigSection as Config,
		LangSelect,
		Section,
		Select,
		faCheck,
		faRefresh,
		faRobot,
	} from '$lib'

</script>

<Section title="">

	<Config
		id="reset"
		config={false}
		icon={faRefresh}
		title={app.t( 'common.settings.extendTitle' )}
	>
		<div>
			<Btn
				class="text-primary-900"
				disabled={app.reset.isRemoving}
				icon={app.reset.isRemoving ? faCheck : undefined}
				onclick={async () => {

					await app.reset.removeFiles()

				}}
			>
				{#if app.reset.isRemoving}
					{app.t( 'common.settings.extendBtnSuccess' )}
				{:else}
					{app.t( 'common.settings.extendBtn' )}
				{/if}
			</Btn>
		</div>
	</Config>

	<Config
		id="automate"
		config={false}
		icon={faRobot}
		title={app.t( 'common.settings.automateTitle' )}
	>
		<div>
			<Btn
				class={app.settings.automate.current ? 'text-primary-900' : 'text-primary-100'}
				color={app.settings.automate.current ? 'primary' : 'dark'}
				onclick={() => app.settings.automate.current = !app.settings.automate.current}
			>
				{#if app.settings.automate.current}
					{app.t( 'common.settings.automateBtnDeactivate' )}
				{:else}
					{app.t( 'common.settings.automateBtnActivate' )}
				{/if}
			</Btn>
		</div>

		{#snippet description()}
			<div>
				{app.t( 'common.settings.automateDescription' )}
			</div>
		{/snippet}
	</Config>

</Section>
<Section title={app.t( 'common.settings.generalTitle' ) || ''}>
	<Config
		id="nots"
		config={false}
		title={app.t( 'common.settings.notsTitle' )}
		value={app.settings.notification.current}
	>
		{#snippet description()}
			{app.t( 'common.settings.notsDescription' )}
		{/snippet}
	</Config>
	<!-- <Config
		config={false}
		title={settings.t( 'common.settings.autostartTitle' )}
		bind:value={$autostart}
	>
		<div slot="desc">
			{settings.t( 'common.settings.autostartDescription' )}
		</div>
	</Config> -->
	<Config
		id="theme"
		config={false}
		title="Interface theme"
	>
		<Select
			id="select-theme"
			options={[
				{
					value : APP_THEME.DEFAULT,
					text  : 'Default',
				},
				{
					value : APP_THEME.MINIMAL,
					text  : 'Minimal',
				},
				{
					value : APP_THEME.FINALCUT,
					text  : 'Final Cut Pro',
				},
				{
					value : APP_THEME.LOGIC,
					text  : 'Logic Pro',
				},
			]}
			bind:value={app.settings.theme.current}
		/>
	</Config>
	<Config
		id="language"
		config={false}
		title={app.t( 'common.settings.languageTitle' )}
	>
		<LangSelect />
	</Config>
</Section>
