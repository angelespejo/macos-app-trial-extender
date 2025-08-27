<script lang="ts">
	let { active = $bindable( false ) }:{ active: boolean } = $props()
</script>
<span
	class={[ 'dot' ]}
	data-active={active}
></span>
