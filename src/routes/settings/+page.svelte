<script lang="ts">
	import { m } from '$i18n/messages'

	import { APP_THEME } from '$const'
	import { app } from '$core'
	import {
		Btn,
		ConfigSection as Config,
		ICON_CLASS_ALERT,
		ICON_CLASS_AUTOMATE,
		ICON_CLASS_LOAD,
		ICON_CLASS_LOCALE,
		ICON_CLASS_RESET,
		ICON_CLASS_THEME,
		LangSelect,
		Section,
		Select,
		Toggle,
	} from '$lib'

</script>

<Section title="">

	<Config
		icon={{ src: ICON_CLASS_RESET }}
		title={m['settings.extendTitle']( )}
	>
		<div>
			<Btn
				class="text-primary-900"
				disabled={app.reset.isRemoving}
				icon={app.reset.isRemoving
					? {
						src   : ICON_CLASS_LOAD,
						class : 'animate-spin mr-2',
					}
					: undefined}
				onclick={async () => {

					await app.reset.removeFiles()

				}}
			>
				{#if app.reset.isRemoving}
					{m['settings.extendBtnRemoving']( )}...
				{:else}
					{m['settings.extendBtn']( )}
				{/if}
			</Btn>
		</div>
	</Config>

	<Config
		icon={{ src: ICON_CLASS_AUTOMATE }}
		title={m['settings.automateTitle']( )}
	>
		<Toggle
			id="automate"
			bind:checked={app.settings.automate.current}
		/>
		{#snippet description()}
			<div>
				{m['settings.automateDescription']( )}
			</div>
		{/snippet}
	</Config>

</Section>
<Section title={m['settings.generalTitle']( ) || ''}>
	<Config

		icon={{ src: ICON_CLASS_ALERT }}
		title={m['settings.notsTitle']( )}
	>

		<Toggle
			id="nots"
			bind:checked={app.settings.notification.current}
		/>
		{#snippet description()}
			{m['settings.notsDescription']( )}
		{/snippet}
	</Config>
	<Config
		icon={{ src: ICON_CLASS_THEME }}
		title={m['settings.themeTitle']( )}
	>
		<Select
			id="select-theme"
			options={[
				{
					value : APP_THEME.DEFAULT,
					text  : 'MATE',
				},
				{
					value : APP_THEME.MINIMAL,
					text  : 'Macintosh 1',
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
		icon={{ src: ICON_CLASS_LOCALE }}
		title={m['settings.languageTitle']()}
	>
		<LangSelect />
	</Config>
</Section>
