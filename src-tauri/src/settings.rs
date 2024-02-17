use std::path::PathBuf;

use serde::Deserialize;
use serde::Serialize;
use serde_json::from_value;
use tauri::Manager;
use tauri::Wry;
use tauri_plugin_store::with_store;
use tauri_plugin_store::StoreCollection;

#[derive(Serialize, Deserialize)]
pub struct Settings {
    #[serde(rename = "workingFolder")]
    pub working_folder: String,
}

pub fn get_settings(app_handle: tauri::AppHandle) -> Option<Settings> {
    let key_store = "settings";
    let stores = app_handle.state::<StoreCollection<Wry>>();
    let path = PathBuf::from("settings.dat");

    with_store(app_handle.clone(), stores, path, |store| {
        if let Some(data) = store.get(key_store) {
            let settings: Settings =
                from_value(data.to_owned()).expect("Can not parse json Value.");
            Ok(Some(settings))
        } else {
            Ok(None)
        }
    })
    .expect("Can not open store")
}
