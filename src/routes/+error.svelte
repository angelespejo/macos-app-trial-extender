<script lang="ts">
    
    import { page } from '$app/stores'
    import { faHouse, Btn, H , P} from '$lib'
  
    const { status, error } = $page
    const { t } = $page.data
    import Logo from '../assets/logo.png'


</script>

<div class="flex flex-col h-full justify-center items-center">
    <img src={Logo} width="100" alt="logo"/>
    <H>Page not found</H>
    <H tag="h2">Error: {status}</H>
    <P>Error message: {error?.message}</P>
    <Btn
        href="/"
        icon={faHouse}
        class="mt-8"
    >{$t('common.btns.goHome')}</Btn>
</div>

