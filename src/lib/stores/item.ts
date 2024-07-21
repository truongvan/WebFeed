import type { Item } from "$lib/types/item";
import { writable } from "svelte/store";

type ItemStore = Record<number, Item[]>

export const feeds = writable<ItemStore>({})
export const currentFeed = writable<Item | null>(null)