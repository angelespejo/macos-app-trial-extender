mod dock;
use tauri::Manager;
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);
        }))
        .invoke_handler(tauri::generate_handler![
            dock::icon_visibility,
            dock::get_icon_visibility,
            // core::remove_file_safe,
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            // dock::icon_visibility(app.app_handle(), true);

            #[cfg(debug_assertions)]
            window.open_devtools();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
