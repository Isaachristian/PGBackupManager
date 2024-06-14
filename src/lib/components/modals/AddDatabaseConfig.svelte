<script lang="ts">
	import { addingDatabase } from '$lib/stores/modals'
	import { page } from '$app/stores'
</script>

<sl-dialog
	class="dialog"
	title="test"
	label="Add Database Configuration"
	on:sl-hide={() => ($addingDatabase = false)}
	open={$addingDatabase ?? false}
>
	<form action="?/TestConnection" class="grid grid-cols-2 gap-4">
		<sl-input label="Database Name" name="name" placeholder="Test" class="col-span-2" />
		<sl-input label="Host" name="host" placeholder="localhost" />
		<sl-input label="Port" name="port" placeholder="5432" value="5432" type="number" />
		<sl-input label="User" name="user" placeholder="User" />
		<sl-input
			label="Password"
			placeholder="Password"
			type="password"
			password-toggle
			autocomplete="new-password"
			name="password"
		/>
		<sl-input label="Database" value="Postgres" name="database" />
	</form>

	<div slot="footer" class="flex w-full gap-4">
		{#if $page.form?.connectionTestResult === true}
			<div
				class="grow text-left text-green-600 leading-4 py-2.5 flex justify-items-start space-x-2"
			>
				<sl-icon name="info-circle" />
				<div>Test successful!</div>
			</div>
		{:else if $page.form?.connectionTestResult === false}
			<!--	-->
		{:else}
			<div class="grow"></div>
		{/if}

		<sl-button variant="text" type="submit">Test Connection</sl-button>
		<sl-button
			variant="primary"
			form="AddDatabase"
			formaction="?/AddDatabaseConfiguration"
			type="submit"
			disabled={$page.form?.connectionTestResult !== true}
		>
			<sl-icon slot="prefix" name="database-add"></sl-icon>
			Submit
		</sl-button>
	</div>
</sl-dialog>
