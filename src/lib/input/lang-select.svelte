<script lang="ts">

    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { Select } from 'flowbite-svelte';
    import type { Writable } from 'svelte/store';

    export let t
    export let locales
    export let locale: Writable<String>

    export let placeholder = ""
    
    const onChange = ({target}: Event ) => {
        if( target && 'value' in target && typeof target.value === 'string') {
            goto(`/${target.value}${route}`)
			locale.set(target.value)
		}
    }
    
    $: ({ route } = $page.data)

</script>

<Select 
    size="sm"
    {placeholder}
    on:change={onChange}
    class="py-1 text-xs"
>
    {#each $locales as lc}
        <option 
            value="{lc}"
            selected="{lc === $locale}"
        >   {$t(`lang.${lc}`)}
        </option>
    {/each}
</Select>
