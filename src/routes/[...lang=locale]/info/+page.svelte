<script lang="ts">

	import Item from './item.svelte'
	import { page } from '$app/stores'

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
			href="{$page.data.pkg.repository.url}"
			target="_blank"
		>
			{$t( 'common.btns.opensource' )}
		</Badge>
		<Badge
			class="hover:bg-primary-700"
			href="{$page.data.pkg.repository.url}"
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
		value={$page.data.pkg.extra.productName}
	/>
	<Item
		icon={faTag}
		key={$t( 'common.btns.version' )}
		value={$page.data.pkg.version}
	/>
	<Item
		href={$page.data.pkg.extra.licenseUrl}
		icon={faScroll}
		key={$t( 'common.btns.license' )}
		value={$page.data.pkg.license}
	/>
	<Item
		href={$page.data.pkg.author.url}
		icon={faUser}
		key={$t( 'common.btns.author' )}
		value={$page.data.pkg.author.name}
	/>
	<Item
		href={$page.data.pkg.homepage}
		icon={faGlobe}
		key={$t( 'common.btns.homepage' )}
		value={$t( 'common.btns.viewMore' )}
	/>
	<Item
		href={$page.data.pkg.funding.url}
		icon={faHeart}
		key={$t( 'common.btns.funding' )}
		value={$t( 'common.btns.readMore' )}
	/>
	<Item
		href={$page.data.pkg.bugs.url}
		icon={faBug}
		key={$t( 'common.btns.bugs' )}
		value={$t( 'common.btns.sendIssue' )}
	/>

</Section>
<Section
	id='{$page.data.pkg.extra.ids.pages.infoHow}'
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
