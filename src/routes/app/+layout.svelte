<script lang="ts">
	import MainMenu from '$lib/components/nav/MainMenu.svelte'
	import MobileMainMenu from '$lib/components/nav/MobileMainMenu.svelte'
	import AddCategory from '$lib/components/modals/AddCategory.svelte'
	import AddDatabaseConfig from '$lib/components/modals/AddDatabaseConfig.svelte'

	export let data
</script>

<div
	class="w-full h-full grid grid-cols-[1fr] grid-rows-[3rem_auto] lg:grid-cols-[16rem_auto]
				 lg:grid-rows-1"
>
	<MobileMainMenu categories={data.categories ?? []} />
	<MainMenu categories={data.categories ?? []} />
	<div class="relative overflow-x-hidden overflow-y-auto bg-neutral-700"><slot /></div>
</div>

<AddCategory />
<AddDatabaseConfig />
