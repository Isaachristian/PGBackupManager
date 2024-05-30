import type { Database } from 'sqlite'
import { compare, hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export async function create(
	db: Database,
	name: string,
	username: string,
	password: string,
	is_admin: boolean = false
): Promise<{ sessionID?: string; err?: string }> {
	const hashedPass = await hash(password, 10)

	const user = await db.run(
		'insert into user (name, email, password, is_admin) values (?, ?, ?, ?)',
		name,
		username,
		hashedPass,
		is_admin
	)
	console.log(user)

	return await login(db, username, password)
}

export async function login(
	db: Database,
	username: string,
	password: string
): Promise<{ sessionID?: string; err?: 'User not found' | 'Password incorrect' }> {
	const user = await db.get('SELECT * FROM user WHERE email = ?', username)

	if (!user) return { err: 'User not found' }

	const match = await compare(password, user.password)
	if (!match) return { err: 'Password incorrect' }

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
