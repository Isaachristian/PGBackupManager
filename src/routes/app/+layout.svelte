<script lang="ts">
	import MainMenu from '$lib/components/nav/MainMenu.svelte'
	import MobileMainMenu from '$lib/components/nav/MobileMainMenu.svelte'
</script>

<div
	class="w-full h-full grid grid-cols-[1fr] grid-rows-[3rem_auto] lg:grid-cols-[16rem_auto]
				 lg:grid-rows-1"
>
	<MobileMainMenu />
	<MainMenu />
	<div class="relative overflow-x-hidden overflow-y-auto bg-gray-700"><slot /></div>
</div>
