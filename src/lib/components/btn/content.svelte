<script lang="ts">
	import {
		type ButtonContentProps,
		Icon,
	} from '$lib'

	let {
		icon,
		iconPosition = 'left',
		children,
	}: ButtonContentProps = $props()

</script>

{#if icon && iconPosition === 'left'}
	<Icon
		class={[ children ? 'mr-2' : '' ]}
		{...icon}
	/>
{/if}

{@render children?.()}

{#if icon && iconPosition === 'right'}
	<Icon
		class={[ children ? 'ml-2' : '' ]}
		{...icon}
	/>
{/if}
