import { writable } from "svelte/store";
import { Store } from "@tauri-apps/plugin-store";
interface Settings {
    workingFolder: string | null
}
const store = new Store("settings.dat");

function createWritable() {
    const KEY_STORE = "settings"
    const { subscribe, set, update } = writable<Settings>({
        workingFolder: null
    })
    let unsubscribe = () => { }

    function load() {
        store.get<Settings>(KEY_STORE).then((value) => {
            if (value) {
                set(value)
            }
        })

        unsubscribe = subscribe((value) => {
            if (value) {
                store.set(KEY_STORE, value);
            }


        })
    }
    function unload() {
        unsubscribe()
    }

    return {
        subscribe, set, update, unload, load
    }

}
export const settingsStore = createWritable()