import type { Database } from 'sqlite'
import type { Category } from '$lib/interfaces/Category'

export async function getCategories(db: Database, userId: number): Promise<Category[]> {
	const sql = `
      select *
      from category
      where user_id = ?
      order by name
	`

	return []
}
