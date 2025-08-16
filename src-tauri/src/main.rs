// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// https://github.com/tauri-apps/window-vibrancy
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

// https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/autostart
// use tauri_plugin_autostart::MacosLauncher;

// https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/single-instance
#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

mod core;
mod dock;
mod tray;

pub fn main() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        //////////////////////////////////////////////////////////////////////////////
        // PLUGINS
        //////////////////////////////////////////////////////////////////////////////
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);
            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(tauri_plugin_fs_watch::init())
        // .plugin(tauri_plugin_autostart::init(
        //     MacosLauncher::LaunchAgent,
        //     Some(vec!["--flag1", "--flag2"]),
        // ))
        //////////////////////////////////////////////////////////////////////////////
        // COMMANDS
        //////////////////////////////////////////////////////////////////////////////
        .invoke_handler(tauri::generate_handler![
            core::backend_i18n,
            core::reset_trial_data,
            core::reset_trial_data_watcher
        ])
        //////////////////////////////////////////////////////////////////////////////
        // SETUP
        //////////////////////////////////////////////////////////////////////////////
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(debug_assertions)]
            window.open_devtools();

            tray::create(app).build(app)?;
            dock::icon_visibility(true);

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            Ok(())
        })
        //////////////////////////////////////////////////////////////////////////////
        // ON
        //////////////////////////////////////////////////////////////////////////////
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
                dock::icon_visibility(false);
                println!("Prevent close app on close window")
            }
            _ => {}
        })
        //////////////////////////////////////////////////////////////////////////////
        // BUILD
        //////////////////////////////////////////////////////////////////////////////
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    //////////////////////////////////////////////////////////////////////////////
    // RUN
    //////////////////////////////////////////////////////////////////////////////
    app.run(|_app_handle, event| match event {
        // Keep the backend running
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
            println!("Prevent backend app on close window")
        }
        _ => {}
    });
}
