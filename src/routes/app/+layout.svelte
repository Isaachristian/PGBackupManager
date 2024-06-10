<script lang="ts">
	import MainMenu from '$lib/components/nav/MainMenu.svelte'
	import MobileMainMenu from '$lib/components/nav/MobileMainMenu.svelte'
</script>

<div class="w-full h-full grid mobileGrid lg:mainGrid">
	<MobileMainMenu />

	<MainMenu />

	<div class="relative">
		<slot />
	</div>
</div>

<style>
	.mobileGrid {
		grid-template-columns: 1fr;
		grid-template-rows: 3rem auto;
	}

	.mainGrid {
		grid-template-columns: 16rem auto;
	}
</style>
