#![cfg(target_os = "linux")]
use fork::{daemon, Fork};
use std::fs;
use std::path::PathBuf;
use std::process::Command;
use std::{fs::metadata, path::PathBuf}; // dep: fork = "0.1"

#[tauri::command]
pub fn show_in_folder(path: String) {
    if path.contains(",") {
        // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
        let new_path = match metadata(&path).unwrap().is_dir() {
            true => path,
            false => {
                let mut path2 = PathBuf::from(path);
                path2.pop();
                path2.into_os_string().into_string().unwrap()
            }
        };
        Command::new("xdg-open").arg(&new_path).spawn().unwrap();
    } else {
        if let Ok(Fork::Child) = daemon(false, false) {
            Command::new("dbus-send")
                .args([
                    "--session",
                    "--dest=org.freedesktop.FileManager1",
                    "--type=method_call",
                    "/org/freedesktop/FileManager1",
                    "org.freedesktop.FileManager1.ShowItems",
                    format!("array:string:\"file://{path}\"").as_str(),
                    "string:\"\"",
                ])
                .spawn()
                .unwrap();
        }
    }
}
