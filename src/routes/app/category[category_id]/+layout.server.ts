import type { ServerLoad } from '@sveltejs/kit'
import type { ServerConfig } from '$lib/interfaces/ServerConfig'
import { getServerConfigsByCategory } from '$lib/server/views/serverConfigs'

type CategoryLoad = {
	databases: ServerConfig[]
}

export const load: ServerLoad = async ({ params, locals }): Promise<CategoryLoad> => {
	const categoryID = params.category_id
	if (!categoryID) {
		console.error(`The category id is not defined: ${categoryID}`)

		return { databases: [] }
	}

	try {
		const databases = await getServerConfigsByCategory(locals.db, +categoryID)

		return { databases }
	} catch (e) {
		console.error(e)
	}

	return { databases: [] }
}
