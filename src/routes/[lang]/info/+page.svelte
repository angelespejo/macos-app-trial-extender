<script lang="ts">

	import {
		DATA,
		PAGE_ID,
	} from '$const'
	import { app } from '$core'
	import {
		Badge,
		InfoItem as Item,
		Section,
		TableTest,
		faBug,
		faGlobe,
		faHeart,
		faScroll,
		faSignature,
		faTag,
		faUser,
	} from '$lib'

</script>

<Section
	id='about'
	title={app.t( 'common.info.aboutTitle' )}
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
			{app.t( 'common.btns.opensource' )}
		</Badge>
		<Badge
			class="hover:bg-primary-700"
			link={{
				href   : DATA.PKG.repository.url,
				target : '_blank',
			}}
			type="secondary"
		>
			{app.t( 'common.btns.free' )}
		</Badge>
	</p>
	<p>
		{app.t( 'common.info.aboutDescription' )}
	</p>
	<p>
		{app.t( 'common.info.aboutAlert' )}
	</p>

</Section>
<Section
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={app.t( 'common.info.title' )}
>
	<Item
		icon={faSignature}
		key={app.t( 'common.btns.name' )}
		value={DATA.PKG.extra.productName}
	/>
	<Item
		icon={faTag}
		key={app.t( 'common.btns.version' )}
		value={DATA.PKG.version}
	/>
	<Item
		href={DATA.PKG.extra.licenseUrl}
		icon={faScroll}
		key={app.t( 'common.btns.license' )}
		value={DATA.PKG.license}
	/>
	<Item
		href={DATA.PKG.author.url}
		icon={faUser}
		key={app.t( 'common.btns.author' )}
		value={DATA.PKG.author.name}
	/>
	<Item
		href={DATA.PKG.homepage}
		icon={faGlobe}
		key={app.t( 'common.btns.homepage' )}
		value={app.t( 'common.btns.viewMore' )}
	/>
	<Item
		href={DATA.PKG.funding.url}
		icon={faHeart}
		key={app.t( 'common.btns.funding' )}
		value={app.t( 'common.btns.readMore' )}
	/>
	<Item
		href={DATA.PKG.bugs.url}
		icon={faBug}
		key={app.t( 'common.btns.bugs' )}
		value={app.t( 'common.btns.sendIssue' )}
	/>

</Section>
<Section
	id={PAGE_ID.infoHow}
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={app.t( 'common.info.howTitle' )}
>

	<p>
		{app.t( 'common.info.howDescription' )}
	</p>
	<p>
		{app.t( 'common.info.howResume' )}
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
	title="{app.t( 'common.info.contributors' )}"
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
