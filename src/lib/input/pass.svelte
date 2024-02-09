<script>
    import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

    import { Input, Label } from "flowbite-svelte";
    import Fa from "svelte-fa";
    export let id = ""
    export let title=""
    export let desc=""
    export let placeholder=title
    export let value = ''
    let show = false;

</script>

<Label for="{id}" class="mb-2">{title}</Label>
{#if show}
  <p>{desc}</p>
{/if}
<Input id="s{id}" type={show ? 'text' : 'password'} {placeholder} size="sm" bind:value>
  <button slot="left" on:click={() => (show = !show)} class="pointer-events-auto" >
    {#if show}
      <Fa icon="{faEye}" class="w-6 h-6" />
    {:else}
        <Fa icon="{faEyeSlash}" class="w-6 h-6" />
    {/if}
  </button>
</Input>
