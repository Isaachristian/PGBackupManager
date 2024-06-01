<script lang="ts">
	export let show: boolean

	let dialog: any | undefined

	// connection details
	let name: string

	$: show ? dialog?.show() : dialog?.hide()
</script>

<sl-dialog
	class="dialog"
	title="test"
	label="Add Database Configuration"
	bind:this={dialog}
	on:sl-hide={() => (show = false)}
>
	<form action="?/AddDatabaseConfiguration" class="grid grid-cols-2 gap-4">
		<sl-input label="Database Name" placeholder="Test" class="col-span-2" bind:value={name} />
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

		<div>{name}</div>
	</form>

	<sl-button slot="footer" variant="primary" form="AddDatabase" type="submit">
		<sl-icon slot="prefix" name="database-add"></sl-icon>
		Submit
	</sl-button>
</sl-dialog>

<style>
	sl-dialog {
		--width: 40rem;
		--header-spacing: 1rem;
		--body-spacing: 1rem;
		--footer-spacing: 1rem;
	}
</style>
