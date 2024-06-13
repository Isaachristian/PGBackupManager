import { type Actions, redirect, type ServerLoad } from '@sveltejs/kit'
import { getUserCount } from '$lib/server/views/user'
import { login } from '$lib/server/controllers/auth'
import type { LoginActionResponse } from '$lib/interfaces/LoginActionResponse'
import { validatePassword } from '$lib/utils/login'
import speakeasy, { type GeneratedSecret } from 'speakeasy'
import { create } from '$lib/server/controllers/user'

interface LoginData {
	setup: boolean
	secret?: GeneratedSecret
}

export const load = (async ({ locals, url }): Promise<LoginData> => {
	const userCount = await getUserCount(locals.db)

	const setup = userCount === 0 || !!url.searchParams.get('setup')

	return {
		setup,
		secret: setup ? speakeasy.generateSecret({ length: 20, name: 'IW Backup Manager' }) : undefined
	}
}) satisfies ServerLoad

export const actions = {
	Login: async ({ request, locals, cookies }): Promise<LoginActionResponse> => {
		const { db } = locals

		const data = await request.formData()
		const username = data.get('username')
		const password = data.get('password')
		const token = data.get('token')?.toString() ?? ''

		// check for quick errors
		const emailRegex = /^\S+@\S+\.\S+$/
		if (username === null || username === '') return { usernameErr: 'Username required' }
		if (!emailRegex.test(username.toString())) return { usernameErr: 'Invalid email address' }
		if (password === null) return { passwordErr: 'Password required' }

		try {
			// attempt login
			const { sessionID, err } = await login(db, username.toString(), password.toString(), token)
			if (err) return err === 'Password incorrect' ? { passwordErr: err } : { generalErr: err }
			if (!sessionID) return { generalErr: 'Something went wrong' }

			// set session if valid login
			cookies.set('sessionID', sessionID, {
				path: '/',
				httpOnly: true,
				secure: true, // todo change
				sameSite: 'strict'
			})
		} catch (e) {
			console.error(e)

			return { generalErr: 'Something went wrong!' }
		}

		redirect(303, '/app')
	},

	Create: async ({ request, locals, cookies }): Promise<LoginActionResponse> => {
		const { db } = locals

		const data = await request.formData()
		const name = data.get('name')
		const username = data.get('username')
		const password = data.get('password')
		const secret = data.get('secret')?.toString() ?? ''
		const token = data.get('token')?.toString() ?? ''

		// check for quick errors
		const emailRegex = /^\S+@\S+\.\S+$/
		if (name === null || name === '') return { nameErr: 'Name is required' }
		if (username === null || username === '') return { usernameErr: 'Username is required' }
		if (!emailRegex.test(username.toString())) return { usernameErr: 'Invalid email address' }
		if (password === null || password === '') return { passwordErr: 'Password required' }

		const issue = validatePassword(password.toString())
		if (issue !== undefined) return { passwordErr: issue }

		if (!speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 }))
			return { generalErr: 'Could not verify token' }

		try {
			const { sessionID, err } = await create(
				db,
				name.toString(),
				username.toString(),
				password.toString(),
				(await getUserCount(db)) === 0,
				secret
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

		redirect(303, '/app')
	}
} satisfies Actions
