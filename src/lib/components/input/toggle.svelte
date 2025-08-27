<script lang="ts">
	import type { ToggleProps } from './types'

	let {
		checked = $bindable( false ),
		class: klass,
		id,
		...rest
	}: ToggleProps = $props()

</script>

<input
	{id}
	class={[ 'hidden', 'toggle--input' ]}
	type="checkbox"
	bind:checked={checked}
	{...rest}
>
<label
	class={[
		'toggle',
		klass,
		checked ? 'checked' : '',
	]}
	for={id}
>
	<span class="toggle--point"></span>
</label>

