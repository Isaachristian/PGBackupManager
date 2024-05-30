import type { Database } from 'sqlite'

export async function getUserCount(db: Database): Promise<number> {
	const sql = `
      select count(*) as count
      from user
	`

	const { count = 0 } = (await db.get<{ count: 1 }>(sql)) ?? {}

	return count
}
