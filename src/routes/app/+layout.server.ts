import type { ServerLoad } from '@sveltejs/kit'
import type { User } from '$lib/interfaces/User'
import type { Category } from '$lib/interfaces/Category'
import { getUserById } from '$lib/server/views/user'
import { getCategories } from '$lib/server/views/categories'

interface BaseData {
	user: User | undefined
	categories: Category[]
}

export const load: ServerLoad = async ({ locals }): Promise<BaseData> => {
	const { db, userId } = locals

	try {
		const user = userId ? await getUserById(db, userId) : undefined
		const categories: Category[] = await getCategories(db, userId)

		return { user, categories }
	} catch (e) {
		console.error(e)
	}

	return { user: undefined, categories: [] }
}
