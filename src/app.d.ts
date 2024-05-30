// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { type Database, Statement } from 'sqlite3';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Database<Database, Statement>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
