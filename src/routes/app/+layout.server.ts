import type { ServerLoad } from '@sveltejs/kit'
import type { User } from '$lib/interfaces/User'
import type { Category } from '$lib/interfaces/Category'
import type { ServerConfig } from '$lib/interfaces/ServerConfig'
import { getUserById } from '$lib/server/views/user'

interface BaseData {
	user: User | undefined
	categories: Category[]
	serverConfig: ServerConfig[]
}

export const load: ServerLoad = async ({ locals, depends, params, url }): Promise<BaseData> => {
	const { db, userId } = locals

	try {
		const user = userId ? await getUserById(db, userId) : undefined
		const categories: Category[] = []
		const serverConfig: ServerConfig[] = []

		console.log(user, userId)

		return { user, categories, serverConfig }
	} catch (e) {
		console.error(e)
	}

	return { user: undefined, categories: [], serverConfig: [] }
}
