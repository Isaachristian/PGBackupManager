import type { Database } from 'sqlite'
import { hash } from 'bcrypt'
import { login } from '$lib/server/controllers/auth'

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
