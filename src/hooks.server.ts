import { type Cookies, type Handle, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db/db'
import { Database } from 'sqlite'

async function loadUserFromSession(
	cookies: Cookies
): Promise<{ id: number; name: string; email: string } | undefined> {
	const sesssionID = cookies.get('sessionID')

	if (sesssionID === undefined) return undefined

	return { id: 0, name: '', email: '' }
}

async function sessionValid(db: Database, cookies: Cookies): Promise<boolean> {
	const sessionID = cookies.get('sessionID')
	if (sessionID === undefined) return false

	const { expires_at } =
		(await db.get<{ expires_at: number }>(
			'select expires_at from session where session_uuid = ?',
			sessionID
		)) ?? {}

	const isValid = expires_at !== undefined && expires_at >= new Date().getTime()
	console.log(expires_at, new Date().getTime(), isValid)

	if (isValid) {
		// extend
	} else {
		cookies.delete('sessionID', { path: '/' })
	}

	return isValid
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = db

	const path = event.url.pathname
	if (await sessionValid(db, event.cookies)) {
		if (path === '/') redirect(307, '/home')
	} else {
		if (path !== '/') redirect(307, '/')
	}

	const user = await loadUserFromSession(event.cookies)

	return resolve(event)
}
