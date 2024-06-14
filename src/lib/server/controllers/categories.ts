import type { Database } from 'sqlite'

export async function createCategory(db: Database, userID: number, name: string): Promise<void> {
	const sql = 'insert into category (user_id, name) values (?, ?)'

	await db.run(sql, userID, name)
}

export async function deleteCategory(db: Database, id: number): Promise<void> {
	const sql = 'delete from category where id = ?'

	await db.run(sql, id)
}
