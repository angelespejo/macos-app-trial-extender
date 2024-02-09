<script lang="ts">
    
    import { Button } from "flowbite-svelte";
    import {Fa, type IconDefinition} from '$lib';
    import { page } from "$app/stores";
    import { ripple } from "svelte-ripple-action";

    export let icon: IconDefinition | undefined = undefined
    export let href: string | undefined = undefined
    export let blank: boolean = false
    export let onClick: ((e: Event) => void) | undefined = undefined
    export let color: 'none' | 'primary' | 'dark' = 'primary'
    export let shadow = true
    const colorClass = {
        none: '',
        dark: `bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 focus-within:ring-gray-300 dark:focus-within:ring-gray-800 ${shadow ? 'shadow-btn shadow-gray-500/50' : ''}`,
        primary: `bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 ${shadow ? 'shadow-btn shadow-primary-500/50' : ''}`
    }
    const sharedClass="text-center focus-within:ring-4 focus-within:outline-none transition duration-150 ease-in-out font-bold inline-flex items-center justify-center px-3 py-2 text-xs rounded-full "
    const bClass = () => `${colorClass[color]} ${sharedClass}`

</script>

{#if blank}
    <a 
        {href}
        target="_blank"
        {...$$restProps}
        class="{bClass()} {$$restProps.class || ''}"
        use:ripple
    >
        {#if icon}
            <Fa icon="{icon}" class="mr-2"/>    
        {/if}

        <slot/>
    </a>       
{:else}

    <button 
        type="button"
        on:click={ async (e) => {
            if(onClick) await onClick(e)
            if(href) $page.data.goTo(href)
        }}
        use:ripple
        {...$$restProps}
        class="{bClass()} {$$restProps.class || ''}"
    >
        {#if icon}
            <Fa icon="{icon}" class="mr-2"/>    
        {/if}

        <slot/>
    </button>
{/if}
