<script lang="ts">
	import { addingCategory } from '$lib/stores/modals'
	import type { SlDialog } from '@shoelace-style/shoelace'
	import { onMount } from 'svelte'
	import { applyAction, enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	const e = (() => {
		return async ({ update, result }) => {
			await update({ reset: false })
			await applyAction(result)

			if (result.type === 'success') {
				$addingCategory = false
				if (result.data?.categoryID) await goto(`/app/category${result.data.categoryID}`)
			}
		}
	}) satisfies SubmitFunction

	let dialog: SlDialog

	onMount(() => addingCategory.subscribe((show) => (show ? dialog.show() : dialog?.hide())))

	$: console.log($page.form)
</script>

<sl-dialog
	class="dialog"
	title="test"
	label="Add Category"
	bind:this={dialog}
	on:sl-hide={() => ($addingCategory = false)}
>
	<form
		method="post"
		action="/app?/AddCategory"
		class="grid grid-cols-1 gap-4"
		id="addCategoryForm"
		use:enhance={e}
	>
		<sl-input
			label="Category Name"
			name="name"
			placeholder="Test"
			help-text="Should be only letters and spaces"
			value={$page.form?.categoryName ?? ''}
		/>

		{#if $page.form?.invalidName}
			<div class="error">The category name must only contain numbers, letters and spaces</div>
		{/if}

		{#if $page.form?.notUnique}
			<div class="error">The category name must be unique</div>
		{/if}
	</form>

	<sl-button slot="footer" variant="primary" form="addCategoryForm" type="submit">
		<sl-icon slot="prefix" name="database-add"></sl-icon>
		Submit
	</sl-button>
</sl-dialog>
