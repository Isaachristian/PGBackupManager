<script lang="ts">
	import { addingCategory } from '$lib/stores/modals'
	import type { SlDialog } from '@shoelace-style/shoelace'
	import { onMount } from 'svelte'

	let dialog: SlDialog

	onMount(() => addingCategory.subscribe((show) => (show ? dialog.show() : dialog.hide())))
</script>

<sl-dialog
	class="dialog"
	title="test"
	label="Add Category"
	bind:this={dialog}
	on:sl-hide={() => ($addingCategory = false)}
>
	<form action="?/AddCategory" class="grid grid-cols-1 gap-4">
		<div>Database configurations can be added inside a category</div>
		<sl-input label="Category Name" placeholder="Test" />
	</form>

	<sl-button slot="footer" variant="primary" form="AddDatabase" type="submit">
		<sl-icon slot="prefix" name="database-add"></sl-icon>
		Submit
	</sl-button>
</sl-dialog>
