<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	let newAccountText: string | undefined = undefined

	$: newAccountText =
		data.setup || form?.setup
			? 'Password length must be 8+, and at least one of each of the folling must be present: ' +
				'uppercase letter, lowercase letter, number and special character'
			: undefined
</script>

<form
	method="post"
	use:enhance={() =>
		async ({ update }) => {
			update({ reset: false })
		}}
	action={data.setup || form?.setup ? '?/Create' : '?/Login'}
	class="grid-cols-[auto_32rem_auto] grid-rows-[auto_min-content_auto] grid w-full h-full"
>
	<div
		class="col-start-2 row-start-2 border border-gray-600 bg-gray-800 rounded-lg grid gap-4 p-4 grid-cols-2"
	>
		<div class="col-span-full text-2xl text-center font-semibold">
			{data.setup ? 'Setup Admin Account' : 'Login'}
		</div>

		{#if data.setup}
			<sl-input
				label="Name"
				name="name"
				class="col-span-full helpTextRed"
				type="text"
				placeholder="Firstname Lastname"
				help-text={form?.nameErr}
			/>
		{/if}

		<sl-input
			label="Username"
			name="username"
			class="col-span-full helpTextRed"
			type="email"
			placeholder="name@company.com"
			help-text={form?.usernameErr}
		></sl-input>

		<sl-input
			label="Password"
			name="password"
			class="col-span-full"
			class:helpTextRed={!data.setup || form?.passwordErr}
			type="password"
			password-toggle
			placeholder="Password"
			help-text={form?.passwordErr || newAccountText}
		></sl-input>

		{#if form?.require2fa}
			<sl-input
				label="2FA Code"
				type="number"
				name="token"
				inputmode="numeric"
				autocomplete="one-time-code"
				pattern="[0-9]{6}"
				maxlength="6"
				help-text="Enter your 6 digit 2fa code from your authenticator application"
				class="col-span-full"
			/>
		{/if}

		<sl-button class="mt-4 col-span-full" size="medium" type="submit">
			{data.setup || form?.setup ? 'Create Account' : 'Login'}
		</sl-button>
	</div>
</form>

<style>
	.helpTextRed::part(form-control-help-text) {
		@apply text-red-600;
	}
</style>
