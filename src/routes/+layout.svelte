<script lang="ts" >

    import '../app.css'
    import "svelte-ripple-action/ripple.css";

    import {BtnSidebar, faGears, faHeart, faHouse, faInfo, H, P} from '$lib';
    import Logo from '../assets/logo.png'
    import { page } from '$app/stores';
    
    const {t, store} = $page.data
    const pageIds = store.pagesIds

    $page.data.navTransitions()
    
</script>
    
<div 
    class="h-screen w-full flex flex-row items-center justify-between bg-primary-200/30 dark:bg-primary-900/50 selection:bg-primary-800 selection:text-primary-50 font-sans"
>
    <header class="h-full w-full max-w-[200px] flex flex-col items-start justify-between py-8 px-4">
        <nav class="w-full">
            <div class="flex items-center gap-2">
                <img src="{Logo}" alt="logo" width="50"/>
                <H tag="h3">{$page.data.pkg.extra.productName}</H>
            </div>
            <div class="py-4 flex flex-col w-full [&>button]:w-full items-start gap-2 [&>a]:w-full">
                <BtnSidebar
                    href="/"
                    icon={faHouse}
                    active={$page.data.isOnPage('')}
                    title={$t('common.home.title')}
                />
                <BtnSidebar
                    href={pageIds.settings}
                    icon={faGears}
                    active={$page.data.isOnPage(pageIds.settings)}
                    title={$t('common.settings.title')}
                />
                <BtnSidebar
                    href={pageIds.info}
                    icon={faInfo}
                    active={$page.data.isOnPage(pageIds.info)}
                    title={$t('common.info.title')}
                />
            </div>
        </nav>
        <div class="flex w-full items-center justify-end gap-2">
            <BtnSidebar
                href="{$page.data.pkg.funding.url}"
                icon={faHeart}
                blank={true}
                class="hover:bg-red-500/50"
            />
        </div>
    </header>
    <main class="w-full h-screen flex flex-col p-8 bg-white/80 dark:bg-gray-900/80 rounded-s-2xl shadow-sidebar shadow-gray-700/10 backdrop-blur-md">
        
        <section class="w-full h-full overflow-y-scroll p-2">
            <slot />
        </section>
        <footer class="flex justify-end">
            <P size="sm" class="opacity-50 !m-0 !mt-2">v{$page.data.pkg.version}</P>
        </footer>
    </main>
</div>
