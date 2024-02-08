#![cfg(target_os = "ios")]

#[tauri::command]
pub fn show_in_folder(_path: String) {}
