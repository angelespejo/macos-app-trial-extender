<script lang="ts">
    
    import { Badge, Section, faBug, faGlobe, faHeart, faScroll, faSignature, faTag, faUser, P } from "$lib";
	import { page } from '$app/stores';
    import Item from "./item.svelte";
    const {t} = $page.data

</script>

<Section 
    id='about'
    title={$t('common.info.aboutTitle')}
>
    <P>
        <Badge href="{$page.data.pkg.repository.url}" class="hover:bg-primary-700" target="_blank">
            {$t('common.btns.opensource')}
        </Badge>
        <Badge href="{$page.data.pkg.repository.url}" class="hover:bg-primary-700" target="_blank">
            {$t('common.btns.free')}
        </Badge>
    </P>
    <P>
        {$t('common.info.aboutDescription')}
    </P>
    <P>
        {$t('common.info.aboutAlert')}
    </P>

</Section>
<Section 
    title={$t('common.info.title')}
    accordeon={true}
    accordeonValue={true}
    class="!mt-8"
>
    <Item
        key={$t('common.btns.name')}
        value={$page.data.pkg.extra.productName}
        icon={faSignature}
    />
    <Item
        key={$t('common.btns.version')}
        value={$page.data.pkg.version}
        icon={faTag}
    />
    <Item
        key={$t('common.btns.license')}
        value={$page.data.pkg.license}
        icon={faScroll}
        href={$page.data.pkg.extra.licenseUrl}
    />
    <Item
        key={$t('common.btns.author')}
        icon={faUser}
        value={$page.data.pkg.author.name}
        href={$page.data.pkg.author.url}
    />
    <Item
        key={$t('common.btns.homepage')}
        value={$t('common.btns.viewMore')}
        icon={faGlobe}
        href={$page.data.pkg.homepage}
    />
    <Item
        key={$t('common.btns.funding')}
        value={$t('common.btns.readMore')}
        icon={faHeart}
        href={$page.data.pkg.funding.url}
    />
    <Item
        key={$t('common.btns.bugs')}
        value={$t('common.btns.sendIssue')}
        icon={faBug}
        href={$page.data.pkg.bugs.url}
    />

</Section>
<Section 
    id='{$page.data.pkg.extra.ids.pages.infoHow}'
    title={$t('common.info.howTitle')}
    accordeon={true}
    accordeonValue={true}
    class="!mt-8"
>

    <P>
        {$t('common.info.howDescription')}
    </P>
    <P>
        {$t('common.info.howResume')}
    </P>
</Section>