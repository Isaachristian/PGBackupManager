import type { Database } from 'sqlite'
import { compare } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import speakeasy from 'speakeasy'

export async function login(
	db: Database,
	username: string,
	password: string,
	token: string,
	ignoreToken: boolean = false
): Promise<{
	sessionID?: string
	err?:
		| 'User not found'
		| 'Password incorrect'
		| 'Token incorrect'
		| 'Account created! Awaiting approval...'
}> {
	const user = await db.get('select * from user where email = ? and active', username)

	if (!user) return { err: 'User not found' }

	const match = await compare(password, user.password)
	if (!match) return { err: 'Password incorrect' }

	const { secret } = user
	const tokenMatch = speakeasy.totp.verify({ token, window: 1, secret, encoding: 'base32' })
	if (!tokenMatch && !ignoreToken) return { err: 'Token incorrect' }

	if (!user.approved) return { err: 'Account created! Awaiting approval...' }

	return { sessionID: await generateSession(db, user.id) }
}

async function generateSession(db: Database, userId: number): Promise<string> {
	const removeOldSessions = 'delete from session where user_id = ?'
	const issueSessionSql = 'insert into session (user_id, session_uuid, expires_at) values (?, ?, ?)'

	const sessionID = uuidv4()
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2) // 2 hours

	await db.run(removeOldSessions, userId)
	await db.run(issueSessionSql, userId, sessionID, expiresAt)

	return sessionID
}
