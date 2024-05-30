import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/server/db/db'

export const handle: Handle = async ({ event, resolve }) => {
	// check for authentication and push to login if not authenticated

	// Add db connection
	event.locals.db = db

	return resolve(event)
}
