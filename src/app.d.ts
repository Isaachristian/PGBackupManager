// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { type Database } from 'sqlite'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Database
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
