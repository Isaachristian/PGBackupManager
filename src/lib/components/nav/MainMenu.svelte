<script lang="ts">
	import { page } from '$app/stores'
	import { addingCategory, addingDatabase } from '$lib/stores/modals'
	import type { Category } from '$lib/interfaces/Category'

	export let mobile = false
	export let categories: Category[] = []
</script>

<div class="flex-col h-full lg:flex dark:bg-gray-800" class:flex={mobile} class:hidden={!mobile}>
	<div class="p-4 gap-2">
		<sl-select
			placement="bottom"
			placeholder="Select a category..."
			label="Category"
			on:sl-change={() => alert('mad it here')}
		>
			<sl-option>test</sl-option>
			{#each categories as category}
				{category}
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

	<sl-tree> <sl-tree-item>Overview</sl-tree-item> </sl-tree>

	<div class="mx-4 flex mt-4">
		<div class="grow leading-7 dark:text-gray-300 text-gray-500 font-semibold text-sm">
			Databases
		</div>
		<sl-button size="small" variant="text" on:click={() => ($addingDatabase = true)}>Add</sl-button>
	</div>

	<sl-tree>
		<sl-tree-item>Production</sl-tree-item>
		<sl-tree-item>Test</sl-tree-item>
		<sl-tree-item>Development</sl-tree-item>
	</sl-tree>

	<div class="grow"></div>

	<div class="flex px-4 gap-4">
		<div class="grow leading-8">{$page.data.user?.name}</div>
		<sl-dropdown distance="24" placement="right-start">
			<sl-icon-button slot="trigger" name="person-circle" />
			<sl-menu>
				<sl-menu-item>
					<sl-icon name="gear" slot="prefix" />
					Manage Users
				</sl-menu-item>
				<sl-menu-item>
					<sl-icon name="gear" slot="prefix" />
					Profile Settings
				</sl-menu-item>
				<div class="bg-neutral-700 h-[1px] my-2"></div>
				<sl-menu-item>
					<sl-icon name="box-arrow-in-left" slot="prefix" />
					Logout
				</sl-menu-item>
			</sl-menu>
		</sl-dropdown>
	</div>

	<div class="flex text-gray-400 text-sm font-light p-4">
		<div class="grow">IW Backup Manager</div>
		<div>v0.0.0</div>
	</div>
</div>
