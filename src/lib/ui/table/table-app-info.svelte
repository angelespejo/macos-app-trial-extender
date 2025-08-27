<script lang="ts">

	import { DATA } from '$const'
	import {
		Avatar,
		Badge,
		Table,
	} from '$lib'

	type Props = { data: typeof DATA.APP_INFORMATION[keyof typeof DATA.APP_INFORMATION] }

	let { data }: Props = $props()

</script>

{#snippet statusDiv( status?:string )}
	<Badge type={status === 'skipped' ? 'warning' : status === 'failure' ? 'error' : 'success'}>
		{status || 'success'}
	</Badge>
{/snippet}

<Table.Root>
	<Table.Head>
		<Table.R>
			<Table.H>App version</Table.H>
			<Table.H>OS version</Table.H>
			<Table.H>Test status</Table.H>
			<Table.H>Users</Table.H>
		</Table.R>
	</Table.Head>
	<Table.Body>
		{#each data.tests as test}
			<Table.R>
				<Table.D>{test.appVersion}</Table.D>
				<Table.D>{test.osVersion || 'none'}</Table.D>
				<Table.D>
					{#if test.referenceUrl}
						<a
							href="{test.referenceUrl}"
							target="_blank"
						>
							{@render statusDiv( test.status )}
						</a>
					{:else}
						{@render statusDiv( test.status )}
					{/if}

				</Table.D>
				<Table.D>
					{#if test.user && test.user.length > 0}
						{#each test.user as userId}
							{#if userId in DATA.CONTRIBUTORS}
								{@const user = DATA.CONTRIBUTORS[userId]}
								{#if user.avatar || user.ghUsername}
									<a
										href="{user.url}"
										target="_blank"
									>
										<Avatar
											alt={user.name}
											height="30px"
											image={user.avatar || user.ghUsername ? `https://github.com/${user.ghUsername}.png` : undefined}
											width="30px"
										/>
									</a>
								{:else}
									<div>none</div>
								{/if}
							{/if}

						{/each}
					{:else}
						<div>none</div>
					{/if}
				</Table.D>
			</Table.R>
		{/each}
	</Table.Body>
</Table.Root>

