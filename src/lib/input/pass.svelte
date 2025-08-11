<script>
	import {
		faEye,
		faEyeSlash,
	} from '@fortawesome/free-solid-svg-icons'
	import {
		Input,
		Label,
	} from 'flowbite-svelte'
	import Fa from 'svelte-fa'

	export let id = ''
	export let title = ''
	export let desc = ''
	export let placeholder = title
	export let value = ''
	let show = false

</script>

<Label
	class="mb-2"
	for={id}
>
	{title}
</Label>
{#if show}
	<p>{desc}</p>
{/if}
<Input
	id="s{id}"
	{placeholder}
	size="sm"
	type={show ? 'text' : 'password'}
	bind:value
>
	<button
		slot="left"
		class="pointer-events-auto"
		type="button"
		on:click={() => ( show = !show )}
	>
		{#if show}
			<Fa
				class="w-6 h-6"
				icon="{faEye}"
			/>
		{:else}
			<Fa
				class="w-6 h-6"
				icon="{faEyeSlash}"
			/>
		{/if}
	</button>
</Input>
