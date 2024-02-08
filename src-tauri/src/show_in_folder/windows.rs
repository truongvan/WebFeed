#![cfg(target_os = "windows")]
use std::process::Command;

#[tauri::command]
pub fn show_in_folder(path: String) {
    Command::new("explorer")
        .args(["/select,", &path]) // The comma after select is not a typo
        .spawn()
        .unwrap();
}
