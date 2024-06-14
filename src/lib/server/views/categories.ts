import type { Database } from 'sqlite'
import type { Category } from '$lib/interfaces/Category'

export async function getCategories(db: Database, userId: number): Promise<Category[]> {
	const sql = `
      select *
      from category
      where user_id = ?
      order by name
	`

	return (await db.all<Category[]>(sql, [userId])) ?? []

	// return []
}

export async function categoryUnique(db: Database, name: string): Promise<boolean> {
	const sql = `
      select exists(select count(*)
                    from category
                    where name = ?) as already_exists
	`

	const { already_exists } = (await db.get<{ already_exists: boolean }>(sql, name)) ?? {}

	if (already_exists === undefined) throw new Error(`Failed to check if ${name} already exists`)

	return already_exists
}
