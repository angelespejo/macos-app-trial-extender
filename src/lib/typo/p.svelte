<script lang="ts">
    export let size: 'sm'| 'md' | 'lg' = "md"

    const pClass = {
        sm: 'text-xs',
        lg: 'text-lg',
        md: 'text-md'
    }

</script>
<p 
    {...$$restProps}
    class="{pClass[size]} text-primary-900/80 dark:text-primary-100/50 m-2 opacity-50 {$$restProps.class ?? ''}"
>
    <slot/>
</p>