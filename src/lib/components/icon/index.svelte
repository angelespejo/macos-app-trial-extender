<script lang="ts">

	import type { IconProps } from './types'

	let {
		src,
		class: klass,
		...rest
	}: IconProps = $props()

</script>

<span
	class={[
		'icon',
		src,
		klass,
	]}
	{...rest}
></span>
