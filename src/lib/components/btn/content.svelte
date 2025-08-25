<script lang="ts">
	import {
		type ButtonContentProps,
		Fa,
	} from '$lib'

	let {
		icon,
		iconPosition = 'left',
		children,
	}: ButtonContentProps = $props()

</script>

{#if icon && iconPosition === 'left'}
	<Fa
		class="mr-2"
		icon={icon}
	/>
{/if}

{@render children?.()}

{#if icon && iconPosition === 'right'}
	<Fa
		class="ml-2"
		icon={icon}
	/>
{/if}
