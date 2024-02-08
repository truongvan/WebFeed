#![cfg(target_os = "macos")]
use std::process::Command;

#[tauri::command]
pub fn show_in_folder(path: String) {
    Command::new("open").args(["-R", &path]).spawn().unwrap();
}
