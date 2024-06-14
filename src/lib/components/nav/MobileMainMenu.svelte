<script lang="ts">
	import MainMenu from '$lib/components/nav/MainMenu.svelte'
	import type { SlDrawer } from '@shoelace-style/shoelace'
	import { page } from '$app/stores'
	import type { Category } from '$lib/interfaces/Category'

	export let categories: Category[]

	let drawer: SlDrawer

	function getCurrentPageName(): string {
		if ($page.url.pathname === '/app') return 'Home'

		return 'Unknown'
	}
</script>

<div class="bg-white dark:bg-gray-800 lg:hidden flex">
	<sl-icon-button name="list" class="text-[2rem]" on:click={() => drawer.show()} />
	<div class="leading-[3rem] font-semibold text-lg text-gray-700 dark:text-gray-300 grow">
		{getCurrentPageName()}
	</div>
</div>

<sl-drawer
	placement="start"
	bind:this={drawer}
	style="--size: 20rem; --body-spacing: 0px"
	no-header
>
	<MainMenu mobile bind:categories />
</sl-drawer>

<style>
	sl-drawer::part(panel) {
		@apply p-0 flex-col flex bg-gray-100 dark:bg-gray-900;
	}
</style>
