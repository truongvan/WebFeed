import { getChannels } from "$lib/db/channel";
import { migrate } from "$lib/db/migrations";
import { settingsStore } from "$lib/settings/store";
import { channelsStore } from "$lib/stores/channel";
import { open } from "@tauri-apps/plugin-dialog";

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
        migrate()
        channelsStore.set(await getChannels());
    }
};