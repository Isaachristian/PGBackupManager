import type { Database } from 'sqlite'
import { compare, hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import speakeasy from 'speakeasy'

export async function create(
	db: Database,
	name: string,
	username: string,
	password: string,
	is_admin: boolean = false,
	secret: string
): Promise<{ sessionID?: string; err?: string }> {
	const hashedPass = await hash(password, 10)

	await db.run(
		'insert into user (name, email, password, is_admin, secret, approved) values (?, ?, ?, ?, ?, ?)',
		name,
		username,
		hashedPass,
		is_admin,
		secret,
		is_admin
	)

	return await login(db, username, password, '', true)
}

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

	console.log(token, user.secret)
	const tokenMatch = speakeasy.totp.verify({
		token,
		window: 1,
		secret: user.secret,
		encoding: 'base32'
	})
	if (!tokenMatch && !ignoreToken) return { err: 'Token incorrect' }

	if (!user.approved) return { err: 'Account created! Awaiting approval...' }

	const sessionID = uuidv4()
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2) // 2 hours

	await db.run(
		'insert into session (user_id, session_uuid, expires_at) values (?, ?, ?)',
		user.id,
		sessionID,
		expiresAt
	)

	return { sessionID }
}
