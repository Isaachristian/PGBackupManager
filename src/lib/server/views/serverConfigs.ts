import type { ServerConfig } from '$lib/interfaces/ServerConfig'
import type { Database } from 'sqlite'

export async function getServerConfigsByCategory(
	db: Database,
	categoryId: number
): Promise<ServerConfig[]> {
	const sql = 'select * from server_config where category_id = ?'

	return await db.all<ServerConfig[]>(sql, [categoryId])
}
