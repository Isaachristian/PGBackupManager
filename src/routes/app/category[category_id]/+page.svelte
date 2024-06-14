<script lang="ts">
	import { page } from '$app/stores'
	import Title from '$lib/components/page/Title.svelte'
	import { addingDatabase } from '$lib/stores/modals'

	export let data
</script>

<div class="h-full w-full">
	<Title
		title={data.categories?.find((c) => c.id.toString() === $page.params.category_id)?.name ?? ''}
		subtitle="Overview"
	>
		<sl-button variant="success" on:click={() => ($addingDatabase = true)}>Add Database</sl-button>
	</Title>
</div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">
	Category {$page.params.category_id} Overview
</div>
