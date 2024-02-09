<script lang="ts">
    
    import { Spinner } from "$lib";
    export let path = '$lib'
    let Content: ConstructorOfATypedSvelteComponent
    let loading = true
    let error: string

import(path)
  .then(module => {
    Content = module.default
    loading = false

  })
  .catch(e => {
    console.error('Error loading the component:', e);
    error = e
  });

</script>

{#if error}

  <div class="flex flex-col items-center justify-center max-w-[400px] m-auto text-center">
      <h1>Error in super8</h1>
      <span class="opacity-50 italic">An unexpected error occurred while processing super8. Try reloading the page if the error persists. Contact the pigeonposse team.</span>
      <span class="m-4">{error}</span>
  </div>

{:else}

    {#if loading}
    
    <div class=" flex flex-col items-center">
        <Spinner/>
    </div>

    {:else}
    
        <svelte:component this={Content}/>

    {/if}

{/if}
