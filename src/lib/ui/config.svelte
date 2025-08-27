<script lang="ts">

	import type { Snippet } from 'svelte'

	import {
		Btn,
		ICON_CLASS_INFO,
		Icon,
		type IconProps,
	} from '$lib'

	let {
		icon,
		title = '',
		activeDesc = $bindable( false ),
		description,
		children,
	}: {
		icon?        : IconProps | string
		title?       : string
		activeDesc?  : boolean
		description? : Snippet
		children?    : Snippet
	} = $props()

</script>

<div class="section--config">
	<div class="section--config--header">
		<div class="section--config--title">
			{#if icon}
				<div class="section--config--title--image">
					{#if typeof icon !== 'string'}
						<Icon {...icon} />
					{:else}
						<img
							alt={title}
							src={icon}
						/>
					{/if}
				</div>
			{/if}
			<div>{title}</div>
		</div>
		<div class="section--config--content">
			{#if description}
				<Btn
					class={[ `section--config--content--info-btn` ]}
					color="dark"
					data-active={activeDesc ? 'true' : undefined}
					icon={{
						src   : ICON_CLASS_INFO,
						class : '!m-0 w-2 h-2',
					}}
					onclick={() => activeDesc = !activeDesc}
					shadow={false}
				/>
			{/if}

			{@render children?.()}

		</div>
	</div>
	{#if activeDesc}
		<p class="section--config--description">
			{@render description?.()}
		</p>
	{/if}

</div>
