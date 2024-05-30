import type { Actions } from '@sveltejs/kit'

interface LoginActionResponse {
	generalErr?: string
	usernameErr?: string
	passwordErr?: string
	require2fa?: boolean
}

export const actions = {
	Login: async ({ request, locals, url }): Promise<LoginActionResponse> => {
		const { db } = locals

		const data = await request.formData()

		try {
			return {
				require2fa: true,
				usernameErr: 'Must be a valid email',
				passwordErr: 'Must be a valid password'
			}
		} catch (e: any) {
			console.error(e)

			return { generalErr: 'Something went wrong' }
		}
	}
} satisfies Actions
