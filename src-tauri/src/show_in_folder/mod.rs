#[cfg(target_os = "windows")]
#[path = "windows.rs"]
mod commands;
#[cfg(target_os = "linux")]
#[path = "linux.rs"]
mod commands;
#[cfg(target_os = "macos")]
#[path = "macos.rs"]
mod commands;
#[cfg(target_os = "ios")]
#[path = "ios.rs"]
mod commands;

pub use commands::show_in_folder;
