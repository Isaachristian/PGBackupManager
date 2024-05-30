// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { type Database } from 'sqlite'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Database
			user: {
				id: string
				name: string
				email: string
				is_admin: boolean
				setup_2fa: boolean
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
