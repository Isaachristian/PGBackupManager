import { type Handle, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db/db'
import { getUserIDFromSession, sessionValid } from '$lib/server/views/session'

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname
	if (await sessionValid(db, event.cookies)) {
		if (path === '/') redirect(307, '/app')
	} else {
		if (path !== '/') redirect(307, '/')
	}

	event.locals.db = db
	event.locals.userId = await getUserIDFromSession(event.cookies)

	return resolve(event)
}
