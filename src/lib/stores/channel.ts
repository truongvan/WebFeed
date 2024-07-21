import type { Channel as _Channel } from "$lib/db/channel";
import { writable } from "svelte/store";

interface Channel extends _Channel {
    id: number
}

export const currentChannel = writable<Channel | null>(null)
export const channelsStore = writable<Channel[]>([])