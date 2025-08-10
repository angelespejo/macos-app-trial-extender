<script lang="ts">

	import Logo from '../assets/logo.png'
	import { page } from '$app/stores'

	import {
		Btn,
		H,
		P,
		faHouse,
	} from '$lib'

	const {
		status, error,
	} = $page
	const { t } = $page.data

</script>

<div class="flex flex-col h-full justify-center items-center">
	<img
		alt="logo"
		src={Logo}
		width="100"
	/>
	<H>Page not found</H>
	<H tag="h2">Error: {status}</H>
	<P>Error message: {error?.message}</P>
	<Btn
		class="mt-8"
		href="/"
		icon={faHouse}
	>{$t( 'common.btns.goHome' )}</Btn>
</div>

