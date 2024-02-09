<script lang="ts">
    import H from "$lib/typo/h.svelte";
    import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let title: string
    export let accordeon: boolean = false
    export let accordeonValue = false

</script>
<div {...$$restProps}>
    <button 
        on:click={()=> accordeonValue = accordeonValue ? false : true}
        class="w-full flex justify-between"
    >
        <H tag="h2">{title}</H>
        {#if accordeon }
            <Fa 
                icon={accordeonValue ? faChevronUp : faChevronDown} 
                class="opacity-25 text-primary-800 dark:text-primary-50"
            />
        {/if}
    </button>
    <div class="my-2 flex flex-col gap-2">
        {#if !accordeon}
            <slot/>
        {:else if accordeon && accordeonValue}
            <slot/>
        {/if}
    </div>
</div>