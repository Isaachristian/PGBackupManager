<script lang="ts">
	import MainMenu from '$lib/components/nav/MainMenu.svelte'
</script>

<div class="w-full h-full grid mainGrid">
	<MainMenu />

	<div class="relative">
		<slot />
	</div>
</div>

<style>
	.mainGrid {
		grid-template-columns: 16rem auto;
	}
</style>
