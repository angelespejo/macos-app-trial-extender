<script lang="ts">

	import type { BadgeContentProps } from './types'

	let {
		children,
		class: Klass,
		type,
		...rest
	}: BadgeContentProps = $props()

</script>

{#if rest.link}
	<a
		class={[
			'badge',
			`badge--${type || 'primary'}`,
			Klass,
		]}
		{...rest.link}
	>
		{@render children?.()}
	</a>
{:else}
	<span
		class={[
			'badge',
			`badge--${type || 'primary'}`,
			Klass,
		]}
		{...rest}
	>
		{@render children?.()}
	</span>
{/if}
