import {

	TableBodyCell,
	TableBodyRow,
	TableHeadCell,
} from 'flowbite-svelte'

import Body      from './body.svelte'
import TableFull from './full.svelte'
import Head      from './head.svelte'
import Root      from './root.svelte'

export { TableFull }
export const Table = {
	Root,
	Head,
	HeadCell : TableHeadCell,
	Body,
	BodyCell : TableBodyCell,
	BodyRow  : TableBodyRow,
}
