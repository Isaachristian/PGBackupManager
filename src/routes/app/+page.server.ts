import { type Actions, fail } from '@sveltejs/kit'
import { categoryUnique } from '$lib/server/views/categories'
import { createCategory } from '$lib/server/controllers/categories'

export const actions = {
	AddCategory: async ({ request, locals, url }) => {
		const { userId, db } = locals

		const data = await request.formData()
		const name = data.get('name')?.toString()

		if (!name) return fail(400, { categoryName: name, invalidName: true })

		try {
			if (!(await categoryUnique(db, name)))
				return fail(400, { categoryName: name, notUnique: true })

			const id = await createCategory(db, userId, name)

			return { categoryID: id }
		} catch (e: any) {
			console.error(e)

			return { success: false, message: 'Failed to complete action' }
		}
	}
} satisfies Actions
