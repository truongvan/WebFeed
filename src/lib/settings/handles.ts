import { open } from "@tauri-apps/plugin-dialog";
import { settingsStore } from "$lib/settings/store";
import { getDB } from "$lib/db";
import { migrate } from "$lib/db/migrations";

export async function handleSelectWorkingFolder() {
    const file = await open({
        multiple: false,
        directory: true,
    });
    if (file) {
        settingsStore.update((updater) => {
            updater.workingFolder = file
            return updater
        })
        const db = await getDB()
        migrate(db)
    }
};