<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<div
	class="bg-gray-700 absolute inset-0 grid-cols-[auto_32rem_auto] grid-rows-[auto_min-content_auto] grid"
>
	<form
		method="post"
		use:enhance
		class="col-start-2 row-start-2 border border-gray-600 bg-gray-800 rounded-lg grid gap-4 p-4 grid-cols-2"
	>
		<div class="col-span-full text-2xl text-center font-semibold">Login</div>

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
			class="col-span-full helpTextRed"
			type="password"
			password-toggle
			placeholder="Password"
			help-text={form?.passwordErr}
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

		<sl-button class="mt-4 col-span-full" size="medium" formaction="?/Login" type="submit"
			>Login
		</sl-button>
		<sl-button variant="text" size="medium" formaction="CreateAccount">Create Account</sl-button>
		<sl-button variant="text" size="medium" formaction="ForgotPassword">Forgot Password</sl-button>
	</form>
</div>

<style>
	.helpTextRed::part(form-control-help-text) {
		@apply text-red-600;
	}
</style>
