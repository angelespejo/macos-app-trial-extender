<script lang="ts">

	import Item from './item.svelte'
	import TableTest from './table-test.svelte'
	import { page } from '$app/stores'

	import {
		PACKAGE_DATA,
		PAGE_ID,
		PROJECT_CONTRIBUTORS,
	} from '$const'
	import {
		Badge,
		P,
		Section,
		faBug,
		faGlobe,
		faHeart,
		faScroll,
		faSignature,
		faTag,
		faUser,
	} from '$lib'

	const { t } = $page.data

</script>

<Section
	id='about'
	title={$t( 'common.info.aboutTitle' )}
>
	<P>
		<Badge
			class="hover:bg-primary-700"
			href="{PACKAGE_DATA.repository.url}"
			target="_blank"
		>
			{$t( 'common.btns.opensource' )}
		</Badge>
		<Badge
			class="hover:bg-primary-700"
			href="{PACKAGE_DATA.repository.url}"
			target="_blank"
		>
			{$t( 'common.btns.free' )}
		</Badge>
	</P>
	<P>
		{$t( 'common.info.aboutDescription' )}
	</P>
	<P>
		{$t( 'common.info.aboutAlert' )}
	</P>

</Section>
<Section
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={$t( 'common.info.title' )}
>
	<Item
		icon={faSignature}
		key={$t( 'common.btns.name' )}
		value={PACKAGE_DATA.extra.productName}
	/>
	<Item
		icon={faTag}
		key={$t( 'common.btns.version' )}
		value={PACKAGE_DATA.version}
	/>
	<Item
		href={PACKAGE_DATA.extra.licenseUrl}
		icon={faScroll}
		key={$t( 'common.btns.license' )}
		value={PACKAGE_DATA.license}
	/>
	<Item
		href={PACKAGE_DATA.author.url}
		icon={faUser}
		key={$t( 'common.btns.author' )}
		value={PACKAGE_DATA.author.name}
	/>
	<Item
		href={PACKAGE_DATA.homepage}
		icon={faGlobe}
		key={$t( 'common.btns.homepage' )}
		value={$t( 'common.btns.viewMore' )}
	/>
	<Item
		href={PACKAGE_DATA.funding.url}
		icon={faHeart}
		key={$t( 'common.btns.funding' )}
		value={$t( 'common.btns.readMore' )}
	/>
	<Item
		href={PACKAGE_DATA.bugs.url}
		icon={faBug}
		key={$t( 'common.btns.bugs' )}
		value={$t( 'common.btns.sendIssue' )}
	/>

</Section>
<Section
	id={PAGE_ID.infoHow}
	class="!mt-8"
	accordeon={true}
	accordeonValue={true}
	title={$t( 'common.info.howTitle' )}
>

	<P>
		{$t( 'common.info.howDescription' )}
	</P>
	<P>
		{$t( 'common.info.howResume' )}
	</P>
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
	title="{$t( 'common.info.contributors' )}"
>
	{#each Object.values( PROJECT_CONTRIBUTORS ) as contributor}
		<Item
			href={contributor.url}
			image={contributor.avatar || contributor.ghUsername ? `https://github.com/${contributor.ghUsername}.png` : undefined}
			key={contributor.name}
			value={contributor.role}
		/>
	{/each}
</Section>
