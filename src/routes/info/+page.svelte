<script lang="ts">

	import { m } from '$i18n/messages'

	import {
		DATA,
		PAGE_ID,
	} from '$const'
	import {
		Badge,
		ICON_CLASS_FUNDING,
		ICON_CLASS_ISSUES,
		ICON_CLASS_LICENSE,
		ICON_CLASS_NAME,
		ICON_CLASS_USER,
		ICON_CLASS_VERSION,
		ICON_CLASS_WEB,
		InfoItem as Item,
		Section,
		TableTest,

	} from '$lib'

</script>

<Section
	id='about'
	title={m['info.aboutTitle']( )}
>
	<p>
		<Badge
			class="hover:bg-primary-700"
			link={{
				href   : DATA.PKG.repository.url,
				target : '_blank',
			}}
			type="secondary"
		>
			{m['btns.opensource']( )}
		</Badge>
		<Badge
			class="hover:bg-primary-700"
			link={{
				href   : DATA.PKG.repository.url,
				target : '_blank',
			}}
			type="secondary"
		>
			{m['btns.free']( )}
		</Badge>
	</p>
	<p>
		{m['info.aboutDescription']( )}
	</p>
	<p>
		{m['info.aboutAlert']( )}
	</p>

</Section>
<Section
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={m['info.title']( )}
>
	<Item
		icon={ICON_CLASS_NAME}
		key={m['btns.name']( )}
		value={DATA.PKG.extra.productName}
	/>
	<Item
		icon={ICON_CLASS_VERSION}
		key={m['btns.version']( )}
		value={DATA.PKG.version}
	/>
	<Item
		href={DATA.PKG.extra.licenseUrl}
		icon={ICON_CLASS_LICENSE}
		key={m['btns.license']( )}
		value={DATA.PKG.license}
	/>
	<Item
		href={DATA.PKG.author.url}
		icon={ICON_CLASS_USER}
		key={m['btns.author']( )}
		value={DATA.PKG.author.name}
	/>
	<Item
		href={DATA.PKG.homepage}
		icon={ICON_CLASS_WEB}
		key={m['btns.homepage']( )}
		value={m['btns.viewMore']( )}
	/>
	<Item
		href={DATA.PKG.funding.url}
		icon={ICON_CLASS_FUNDING}
		key={m['btns.funding']( )}
		value={m['btns.readMore']( )}
	/>
	<Item
		href={DATA.PKG.bugs.url}
		icon={ICON_CLASS_ISSUES}
		key={m['btns.bugs']( )}
		value={m['btns.sendIssue']( )}
	/>

</Section>
<Section
	id={PAGE_ID.infoHow}
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={m['info.howTitle']( )}
>
	<p>
		{m['info.howDescription']( )}
	</p>
	<p>
		{m['info.howResume']( )}
	</p>
</Section>
<Section
	id={PAGE_ID.infoTests}
	class="!mt-8"
	accordeon={true}
	accordeonValue={false}
	title="Tests"
>
	<TableTest />
</Section>

<Section
	id={PAGE_ID.infoContributors}
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={m['info.contributors']()}
>
	{#each Object.values( DATA.CONTRIBUTORS ) as contributor}
		<Item
			href={contributor.url}
			image={contributor.avatar || contributor.ghUsername ? `https://github.com/${contributor.ghUsername}.png` : undefined}
			key={contributor.name}
			value={DATA.CONTRIBUTORS_ROLES[contributor.role].name || contributor.role}
		/>
	{/each}
</Section>
