<script lang="ts">
	import Button from './btn.svelte'
	import { Icon } from '$lib/components'

	import type { BtnSidebarProps } from './types'
	import type { Attachment } from 'svelte/attachments'

	let {
		icon,
		href = '/',
		title = '',
		active = $bindable( false ),
		blank = false,
		class: klass,
	}: BtnSidebarProps = $props()

	const setActive = ( active: boolean ): Attachment => e => {

		active ? e.setAttribute( 'data-active', `${active}` ) : e.removeAttribute( 'data-active' )
		active ? e.setAttribute( 'disabled', `${active}` ) : e.removeAttribute( 'disabled' )

	}

</script>

<Button
	class={[ 'button--sidebar', klass ]}
	{@attach setActive( active )}
	{blank}
	color="none"
	{href}
>
	<div class={title && title != '' ? '!h-7 -ml-3 !w-7 object-contain rounded-full flex items-center justify-center bg-primary-50/10' : ''}>
		<Icon src={icon} />
	</div>

	{#if title}
		{title}
	{/if}
</Button>
