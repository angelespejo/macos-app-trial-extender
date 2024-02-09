<script lang="ts">
    
    import { LangSelect, Section, faRobot, Btn, faRefresh, faCheck } from "$lib";

    import Config from "./config.svelte";
    import { page } from "$app/stores";

    const {t, locale, locales, store} = $page.data
    const { notification, automate, autostart } = store
    let isClickedReset = false
    const clickedResetFunction = () => {
        isClickedReset = true
        setTimeout(()=> isClickedReset = false, 2000)
    }
</script>


<Section 
    title={''}
>

    <Config 
        title={$t('common.settings.extendTitle')} 
        config={false}
        icon={faRefresh}
    >
    <div slot="value">

        <Btn 
            icon={isClickedReset ? faCheck : undefined}
            class="text-primary-900"
            onClick={async () => {
                await $page.data.resetTrial()
                clickedResetFunction()
            }}
            disabled={isClickedReset}
        >
            {#if isClickedReset}
                {$t('common.settings.extendBtnSuccess')}
            {:else}
                {$t('common.settings.extendBtn')}
            {/if}
        </Btn>
    </div>     
    </Config>

    <Config 
        title={$t('common.settings.automateTitle')} 
        icon={faRobot}
        config={false}
    >
        <div slot="value">
            <Btn 
                color="{$automate? 'primary': 'dark'}"
                class="{$automate? 'text-primary-900': 'text-primary-100'}"
                onClick={() =>automate.toggle()}
            >
            {#if $automate}
                {$t('common.settings.automateBtnDeactivate')}  
            {:else}
                {$t('common.settings.automateBtnActivate')} 
            {/if}
            </Btn>
        </div>
        
        <div slot="desc">
            {$t('common.settings.automateDescription')} 
        </div>
    </Config>


</Section>
<Section 
    title={$t('common.settings.generalTitle')}
>
    <Config 
        title={$t('common.settings.notsTitle')}
        config={false}
        bind:value={$notification}
    >
        <div slot="desc">
            {$t('common.settings.notsDescription')} 
        </div>
    </Config>
    <Config 
        title={$t('common.settings.autostartTitle')}
        config={false}
        bind:value={$autostart}
    >  
        <div slot="desc">
            {$t('common.settings.autostartDescription')} 
        </div>
    </Config>
    <Config 
        title={$t('common.settings.languageTitle')}
        config={false}
    >  
        <div slot="value">
            <LangSelect {t} {locale} {locales}/>
        </div>
        
    </Config>
</Section>
