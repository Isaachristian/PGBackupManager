<script lang="ts">
	import type { SlDialog } from '@shoelace-style/shoelace'
	import { onMount } from 'svelte'
	import { addingDatabase } from '$lib/stores/modals'

	let dialog: SlDialog

	onMount(() => addingDatabase.subscribe((show) => (show ? dialog.show() : dialog.hide())))
</script>

<sl-dialog
	class="dialog"
	title="test"
	label="Add Database Configuration"
	bind:this={dialog}
	on:sl-hide={() => ($addingDatabase = false)}
>
	<form action="?/AddDatabaseConfiguration" class="grid grid-cols-2 gap-4">
		<sl-input label="Database Name" placeholder="Test" class="col-span-2" />
		<sl-input label="Host" placeholder="localhost" />
		<sl-input label="Port" placeholder="5432" value="5432" type="number" />
		<sl-input label="User" placeholder="User" />
		<sl-input
			label="Password"
			placeholder="Password"
			type="password"
			password-toggle
			autocomplete="new-password"
		/>
		<sl-input label="Database" value="Postgres" />
	</form>

	<sl-button slot="footer" variant="primary" form="AddDatabase" type="submit">
		<sl-icon slot="prefix" name="database-add"></sl-icon>
		Submit
	</sl-button>
</sl-dialog>
