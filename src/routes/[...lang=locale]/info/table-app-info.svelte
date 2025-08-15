<script lang="ts">

	import {
		type APP_INFO,
		PROJECT_CONTRIBUTORS,
	} from '$const'
	import { Table } from '$lib'

	export let data: typeof APP_INFO[keyof typeof APP_INFO]
	const classStatus = 'text-xs flex items-center py-1 px-2 rounded-full w-fit'

</script>

<Table.Root>
	<Table.Head>
		<Table.HeadCell>App version</Table.HeadCell>
		<Table.HeadCell>OS version</Table.HeadCell>
		<Table.HeadCell>Test status</Table.HeadCell>
		<Table.HeadCell>Users</Table.HeadCell>
	</Table.Head>
	<Table.Body>
		{#each data.tests as test}
			<Table.BodyRow>
				<Table.BodyCell>{test.appVersion}</Table.BodyCell>
				<Table.BodyCell>{test.osVersion || 'none'}</Table.BodyCell>
				<Table.BodyCell>
					{#if test.referenceUrl}
						<a
							href="{test.referenceUrl}"
							target="_blank"
						>
							<div class="{test.status === 'skipped' ? 'bg-yellow-600' : test.status === 'failure' ? 'bg-red-600' : 'bg-green-600'} {classStatus}">{test.status || 'success'}</div>
						</a>
					{:else}
						<div class="{test.status === 'skipped' ? 'bg-yellow-600' : test.status === 'failure' ? 'bg-red-600' : 'bg-green-600'} {classStatus}">{test.status || 'success'}</div>
					{/if}

				</Table.BodyCell>
				<Table.BodyCell>
					{#if test.user && test.user.length > 0}
						{#each test.user as userId}
							{#if userId in PROJECT_CONTRIBUTORS}
								{@const user = PROJECT_CONTRIBUTORS[userId]}
								{#if user.avatar || user.ghUsername}
									<a
										href="{user.url}"
										target="_blank"
									>
										<img
											class="w-[30px] h-[30px] rounded-full bg-primary-950/20 object-contain"
											alt="{user.name}"
											src="{user.avatar || user.ghUsername ? `https://github.com/${user.ghUsername}.png` : undefined}"
										>
									</a>
								{:else}
									<div>none</div>
								{/if}
							{/if}

						{/each}
					{:else}
						<div>none</div>
					{/if}
				</Table.BodyCell>
			</Table.BodyRow>
		{/each}
	</Table.Body>
</Table.Root>

