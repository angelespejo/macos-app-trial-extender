<script lang="ts">

    import {Btn, Fa, Toggle, faInfo, type IconDefinition, P } from "$lib";
    
    export let icon: IconDefinition | undefined | string= undefined
    export let title = ""
    export let activeDesc = false
    export let config = true
    export let value = true
    
    let active = false
    const toggleActive = () => active = active == false ? true : false
    const toggleActiveDesc= () => activeDesc = activeDesc == false ? true : false
    const btnClass=(active: boolean)=>`[&>svg]:mr-0 mr-1 text-gray-50 ${!active ? '!bg-gray-500/50 !dark:bg-gray-700/50' : '!bg-gray-600/50 dark:!bg-gray-600'}`

</script>
<div class="flex flex-col w-full p-4 bg-gray-200/60 dark:bg-gray-800/40 hover:bg-gray-200/80 hover:dark:bg-gray-800/60 hover:shadow-lg rounded-lg">
    <div  class="flex justify-between w-full">
        <div class="text-primary-900 dark:text-primary-50 flex items-center gap-2">
            {#if icon}
                <div class="p-2 rounded-full bg-primary-400/20 dark:bg-primary-700/20">
                    {#if typeof icon !== 'string'}
                        <Fa {icon} class="w-[20px] h-[20px]"/>
                    {:else}
                        <img src="{icon}" alt="{title}"  class="w-[20px] h-[20px]"/>
                    {/if}
                </div>
            {/if}
            {title}
        </div>
        <div class="flex flex-row gap-2 items-center">
            {#if $$slots.desc }
                <Btn 
                    color="dark" 
                    onClick={() => toggleActiveDesc()}
                    icon={faInfo}
                    shadow={false}
                    class={btnClass(activeDesc)}
                />
            {/if}
            {#if config }
                <Btn 
                    color="dark" 
                    onClick={() => toggleActive()}
                    icon={faInfo}
                    shadow={false}
                    class={btnClass(active)}

                />
            {/if}
            {#if $$slots.value }
                <slot name="value"/>
            {:else}
                <Toggle bind:checked={value} />
            {/if}
        </div>
    </div>
    {#if activeDesc }
        <P size="sm" class="mt-4">
            <slot name="desc"/>
        </P>
    {/if}
    {#if active && config }
        <div class="bg-gray-800/50 p-2 mt-4 rounded-lg">
            <slot/>
        </div>
    {/if}

</div>