<script lang="ts">

	import {
		Avatar,
		Badge,
		Btn,
	} from '$lib'

	let {
		key = '',
		value = '',
		href,
		icon,
		image,
	}: {
		key?   : string
		value? : string
		href?  : string
		icon?  : string
		image? : string
	} = $props()

</script>

{#snippet content()}
	<span class="font-bold flex items-center gap-1">
		<Avatar
			alt={key}
			height={icon ? '20px' : '40px'}
			{icon}
			image={image}
			width={icon ? '20px' : '40px'}
		/>
		<span>{key}</span>
	</span>
	<Badge>{value}</Badge>
{/snippet}

{#if href}
	<Btn
		class="item-info"
		blank={true}
		color="none"
		{href}
	>
		{@render content()}
	</Btn>
{:else}
	<div class={[ 'item-info' ]}>
		{@render content()}
	</div>
{/if}
