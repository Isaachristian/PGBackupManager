<script lang="ts">
	export let title: string
	export let subtitle: string = ''
</script>

<div class="p-4 flex flex-nowrap gap-x-4">
	<div class="text-xl leading-8">{title}</div>
	<div class="text-xl h-7 mt-0.5 w-[1px] bg-black dark:bg-white"></div>
	<div class="text-xl leading-8 font-light text-gray-700 dark:text-neutral-300 grow">
		{subtitle}
	</div>

	<div class="-my-4 flex flex-col justify-center">
		<slot />
	</div>
</div>
