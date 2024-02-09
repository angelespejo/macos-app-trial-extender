// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// https://github.com/tauri-apps/window-vibrancy
use window_vibrancy::{ apply_vibrancy, NSVisualEffectMaterial};

// https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/autostart
use tauri_plugin_autostart::MacosLauncher;

// https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/single-instance
#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

mod tray;
mod dock;
mod locale;
mod core;

fn main() {

    let app = tauri::Builder::default()
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
        ///////////////////////////////////////////////////////////////////////
        // PLUGINS
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent, 
            None,
        ))
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);
            app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
        }))
        .plugin(tauri_plugin_fs_watch::init())
        ///////////////////////////////////////////////////////////////////////
        // COMMANDS
        .invoke_handler(tauri::generate_handler![
            locale::backend_i18n,
            core::reset_trial_data,
            core::reset_trial_data_watcher
        ])
        ///////////////////////////////////////////////////////////////////////
        // BUILD
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    ///////////////////////////////////////////////////////////////////////
    // RUN
    app.run(|_app_handle, event| match event {
            
            // Keep the backend running
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
                println!("Prevent backend app on close window")
            }

            // Keep the Frontend Running in the Background
            tauri::RunEvent::WindowEvent { event, .. } => match event {
                tauri::WindowEvent::CloseRequested { api, .. } => {
                  api.prevent_close();
                  dock::icon_visibility(false);
                  println!("Prevent close app on close window")
                }
                _ => {}
            },
            _ => {}

        });

}
