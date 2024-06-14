<script lang="ts">
	import { page } from '$app/stores'
	import { addingCategory } from '$lib/stores/modals'
	import type { Category } from '$lib/interfaces/Category'
	import { goto } from '$app/navigation'

	export let mobile = false
	export let categories: Category[] = []
</script>

<div
	class="flex-col h-full lg:flex dark:bg-neutral-800 overflow-y-scroll"
	class:flex={mobile}
	class:hidden={!mobile}
>
	<sl-button
		href="/app"
		variant="text"
		class="mx-4 mt-4 home"
		class:homeSelected={$page.url.pathname === '/app'}
	>
		<sl-icon name="house-door-fill" slot="prefix" />
		Home
	</sl-button>

	<div class="p-4 gap-2">
		<sl-select
			placement="bottom"
			placeholder="Select a category..."
			on:sl-change={(e) => goto(`/app/category${e.target.value}`)}
			value={$page.params.category_id ?? ''}
		>
			{#each categories as { id, name }}
				<sl-option value={id}>{name}</sl-option>
			{/each}

			<sl-divider />

			<sl-button
				size="medium"
				variant="text"
				class="w-full"
				id="addNewBtn"
				on:click={() => ($addingCategory = true)}
			>
				<sl-icon name="plus-circle" slot="prefix" />Add New
			</sl-button>
		</sl-select>
	</div>

	<small class="mx-5">Details</small>
	<sl-tree selection="leaf" class="mx-4 mt-1">
		<sl-tree-item
			class="overview"
			selected={$page.url.pathname.match(/app\/category+[0-9]/) !== null}
		>
			<sl-icon name="info-circle" />Overview
		</sl-tree-item>

		<sl-tree-item>
			<sl-icon name="database-fill" />
			Databases
			{#each $page.data.databases ?? [] as { server_name }}
				<sl-tree-item>{server_name}</sl-tree-item>
			{/each}
		</sl-tree-item>
	</sl-tree>

	<div class="grow"></div>

	<sl-details summary={$page.data.user?.name} class="mx-4">
		<div class="-m-4 *:w-full">
			<sl-button variant="text"> <sl-icon name="gear" slot="prefix" /> Manage Users </sl-button>
			<sl-button variant="text"> <sl-icon name="gear" slot="prefix" /> Profile Settings </sl-button>
			<sl-button variant="danger">
				<sl-icon name="box-arrow-in-left" slot="prefix" /> Logout
			</sl-button>
		</div>
	</sl-details>

	<div class="flex text-gray-400 text-sm font-light p-4 bg-gray-100 dark:bg-neutral-800">
		<div class="grow">IW Backup Manager</div>
		<div>v0.0.0</div>
	</div>
</div>

<style>
	.home::part(base) {
		@apply justify-start text-black dark:text-white dark:hover:bg-neutral-700 rounded-md !h-8 transition-all;
	}

	.homeSelected::part(base) {
		@apply bg-neutral-700;
	}

	/*sl-tree-item::part(expand-button) {*/
	/*	@apply w-fit;*/
	/*}*/

	sl-tree-item::part(item) {
		@apply !rounded-md border-none;
	}
	sl-tree-item::part(item--selected) {
		@apply bg-gray-300 dark:bg-neutral-700;
	}
</style>
