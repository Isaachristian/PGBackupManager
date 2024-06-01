import type { Database } from 'sqlite'
import type { Cookies } from '@sveltejs/kit'
import { db } from '$lib/server/db/db'

export async function sessionValid(db: Database, cookies: Cookies): Promise<boolean> {
	const sessionID = cookies.get('sessionID')
	if (sessionID === undefined) return false

	const sql = 'select expires_at from session where session_uuid = ?'
	const { expires_at } = (await db.get<{ expires_at: number }>(sql, sessionID)) ?? {}
	const isValid = expires_at !== undefined && expires_at >= new Date().getTime()

	if (isValid) {
		// todo extend
	} else {
		cookies.delete('sessionID', { path: '/' })
	}

	return isValid
}

export async function getUserIDFromSession(cookies: Cookies): Promise<number> {
	const sesssionID = cookies.get('sessionID')
	if (sesssionID === undefined) return 0

	const sql = 'select user_id from session where session_uuid = ?'

	return (await db.get<{ user_id: number }>(sql, sesssionID))?.user_id ?? 0
}
