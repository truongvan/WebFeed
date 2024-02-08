import { settingsStore } from "$lib/settings/store";
import Database from "@tauri-apps/plugin-sql";
import { get } from "svelte/store";

let db_: Database | null = null
export async function getDB() {
    if (db_) {
        return db_
    }

    let { workingFolder } = get(settingsStore);
    console.log(workingFolder);

    db_ = await Database.load(
        `sqlite:${workingFolder}/metadata.db`
    );
    return db_
}