import type { Database } from 'sqlite'
import type { Category } from '$lib/interfaces/Category'

export async function createCategory(
	db: Database,
	userID: number,
	name: string
): Promise<number | undefined> {
	const sql = 'insert into category (user_id, name) values (?, ?) returning *'

	const { id } = (await db.get<Category>(sql, userID, name)) ?? {}

	return id
}

export async function deleteCategory(db: Database, id: number): Promise<void> {
	const sql = 'delete from category where id = ?'

	await db.run(sql, id)
}
