<script lang="ts">

    import { Table, TableBody, TableBodyRow,TableBodyCell, TableHead, TableHeadCell } from "flowbite-svelte";
    type Items = {
        head: string[],
        cell: (string[])[]
    }
    export let items: Items 
</script>

<Table divClass="w-full mb-8 relative overflow-x-auto" shadow>
    
    <TableHead theadClass="!bg-primary-500/30 dark:!bg-primary-700/20">
        {#each items.head as head}
        <TableHeadCell>{head}</TableHeadCell>
        {/each}
    </TableHead>

    <TableBody tableBodyClass="[&>tr]:bg-primary-500/20 [&>tr]:dark:bg-primary-800/20">
        {#each items.cell as row}
            <TableBodyRow>
                {#each row as cell}
                    <TableBodyCell>{cell}</TableBodyCell>
                {/each}
            </TableBodyRow>                
        {/each}
    </TableBody>

</Table>