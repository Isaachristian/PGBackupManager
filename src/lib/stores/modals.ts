import { writable } from 'svelte/store'

export const addingDatabase = writable<boolean>(false)
export const addingCategory = writable<boolean>(false)
