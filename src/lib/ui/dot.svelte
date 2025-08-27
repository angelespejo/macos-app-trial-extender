<script lang="ts">
	let { active = $bindable( false ) }:{ active: boolean } = $props()
</script>
<span
	class={[
		'ml-2 w-1 h-1 p-1 flex rounded-full',
		active
			? 'shadow-dot bg-green-600 dark:bg-green-400 shadow-green-500/90'
			: 'bg-gray-500 dark:bg-gray-200',
	]}
></span>
