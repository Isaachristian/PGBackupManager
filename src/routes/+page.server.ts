import { type Actions, redirect, type ServerLoad } from '@sveltejs/kit'
import { getUserCount } from '$lib/server/views/user'
import { create, login } from '$lib/server/controllers/user'
import type { LoginActionResponse } from '$lib/interfaces/LoginActionResponse'
import { validatePassword } from '$lib/utils/login'

interface LoginData {
	setup: boolean
}

export const load = (async ({ locals }): Promise<LoginData> => {
	const userCount = await getUserCount(locals.db)

	return { setup: userCount === 0 }
}) satisfies ServerLoad

export const actions = {
	Login: async ({ request, locals, cookies }): Promise<LoginActionResponse> => {
		const { db } = locals

		const data = await request.formData()
		const username = data.get('username')
		const password = data.get('password')

		// check for quick errors
		const emailRegex = /^\S+@\S+\.\S+$/
		if (username === null || username === '') return { usernameErr: 'Username required' }
		if (!emailRegex.test(username.toString())) return { usernameErr: 'Invalid email address' }
		if (password === null) return { passwordErr: 'Password required' }

		try {
			// attempt login
			const { sessionID, err } = await login(db, username.toString(), password.toString())
			if (err) return err === 'User not found' ? { setup: true } : { passwordErr: err }
			if (!sessionID) return { generalErr: 'Something went wrong' }

			// set session if valid login
			cookies.set('sessionID', sessionID, {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 2)
			})
		} catch (e) {
			console.error(e)

			return { generalErr: 'Something went wrong!' }
		}

		redirect(303, '/home')
	},

	Create: async ({ request, locals, cookies }): Promise<LoginActionResponse> => {
		const { db } = locals

		const data = await request.formData()
		const name = data.get('name')
		const username = data.get('username')
		const password = data.get('password')

		// check for quick errors
		const emailRegex = /^\S+@\S+\.\S+$/
		if (name === null || name === '') return { nameErr: 'Name is required' }
		if (username === null || username === '') return { usernameErr: 'Username is required' }
		if (!emailRegex.test(username.toString())) return { usernameErr: 'Invalid email address' }
		if (password === null || password === '') return { passwordErr: 'Password required' }

		const issue = validatePassword(password.toString())
		if (issue !== undefined) return { passwordErr: issue }

		try {
			const { sessionID, err } = await create(
				db,
				name.toString(),
				username.toString(),
				password.toString()
			)

			if (err || !sessionID) return { generalErr: 'Something went wrong!' }

			// set session if valid login
			cookies.set('sessionID', sessionID, {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 2)
			})
		} catch (e) {
			console.error(e)

			return { generalErr: 'Something went wrong' }
		}

		redirect(303, '/home')
	}
} satisfies Actions
