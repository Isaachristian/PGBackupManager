import type { Actions } from '@sveltejs/kit'

type ConnectionData = {
	databaseName: string
	user: string
	password: string
	host: string
	port: number
	database: string
}

export const actions = {
	TestConnection: async ({ request, locals, url }): Promise<{ connectionTestResult: boolean }> => {
		const { userId, db } = locals

		const data = await request.formData()
		const { databaseName, user, password, host, port, database } = formDataToConnection(data)

		try {
			connectionString = `postgresql://${user ?? ''}:${password ?? ''}@${host ?? ''}:${port ?? ''}/${database ?? ''}`

			return { success: true, message: 'Completed action successfully' }
		} catch (e: any) {
			console.error(e)

			return { success: false, message: 'Failed to complete action' }
		}
	}
} satisfies Actions

function formDataToConnection(data: FormData): Partial<ConnectionData> {
	const databaseName = data.get('name')?.toString()
	const user = data.get('user')?.toString()
	const password = data.get('password')?.toString()
	const host = data.get('host')?.toString()
	const port = data.get('port')?.toString()
	const database = data.get('database')?.toString()

	return {
		databaseName,
		user,
		database,
		host,
		port,
		password
	}
}
