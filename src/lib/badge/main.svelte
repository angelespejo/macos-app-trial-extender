<script>
	import { Badge } from 'flowbite-svelte'

</script>
<Badge
	{...$$restProps}
	class="rounded-lg {$$restProps.class ?? ''}"
>
	<slot />
</Badge>
