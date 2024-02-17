import { writable } from "svelte/store";
import { Store } from "@tauri-apps/plugin-store";
interface Settings {
    workingFolder: string | null;
}
const store = new Store("settings.dat");

function createWritable() {
    const KEY_STORE = "settings";
    const { subscribe, set, update } = writable<Settings>({
        workingFolder: null,
    });
    let unsubscribe = () => {};

    async function load() {
        let value = await store.get<Settings>(KEY_STORE);
        if (value) {
            set(value);
        }

        unsubscribe = subscribe((value) => {
            if (value) {
                store.set(KEY_STORE, value);
                store.save();
            }
        });
    }

    return {
        subscribe,
        set,
        update,
        load,
        unsubscribe,
    };
}
export const settingsStore = createWritable();
