import type { Database } from 'sqlite'
import type { User } from '$lib/interfaces/User'

export async function getUserCount(db: Database): Promise<number> {
	const sql = `
      select count(*) as count
      from user
	`

	const { count = 0 } = (await db.get<{ count: 1 }>(sql)) ?? {}

	return count
}

export async function getUserById(db: Database, userId: number): Promise<User | undefined> {
	const sql = `
      select id, name, email, is_admin
      from user
      where id = ?
        and active
	`

	return await db.get<User>(sql, [userId])
}
