mod feed;
mod show_in_folder;
mod settings;
use feed::{download_favicon, get_article, get_feed};
use show_in_folder::show_in_folder;
pub use settings::get_settings;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            show_in_folder,
            get_feed,
            download_favicon,
            get_article
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
