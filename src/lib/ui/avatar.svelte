<script lang="ts">

	import {
		ICON_CLASS_USER,
		Icon,
	} from '$lib'

	let {
		width = '40px',
		height = '40px',
		alt = '',
		image = '',
		icon,
	}: {
		width?  : string
		height? : string
		alt?    : string
		image?  : string
		icon?   : string
	} = $props()

</script>

<div
	style="--avatar-width: {width}; --avatar-height: {height};"
	class="avatar"
>

	{#if image}
		<img
			alt={alt}
			{height}
			src={image}
			{width}
		/>
	{:else}
		<div class="fallback">
			<Icon src={icon || ICON_CLASS_USER} />
		</div>
	{/if}
</div>
