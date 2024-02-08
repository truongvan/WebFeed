import { get, writable } from "svelte/store";

export const DEFAULT_SIZE = 200;

function MenuSize() {
    const { subscribe, set, update } = writable({
        size: DEFAULT_SIZE,
        closed: false
    })

    function setSize(size: number) {
        let value = get({ subscribe })
        value.size = size
        set(value)
    }


    return {
        subscribe, set, update, setSize
    }

}

export const menuSizeStore = MenuSize()

export const channelStateStore = writable<Record<number, boolean>>({})