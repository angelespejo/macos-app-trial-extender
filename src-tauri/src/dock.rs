use std::sync::Mutex;
use tauri::{command, ActivationPolicy, AppHandle, Runtime};

static DOCK_STATE: Mutex<bool> = Mutex::new(true);

#[command]
pub fn get_icon_visibility() -> bool {
    *DOCK_STATE.lock().unwrap()
}

pub fn set_icon_visibility(show_icon: bool) -> bool {
    *DOCK_STATE.lock().unwrap() = show_icon;
    show_icon
}

#[command]
pub fn icon_visibility<R: Runtime>(app: AppHandle<R>, show_icon: bool) -> bool {
    let result = if show_icon {
        app.set_activation_policy(ActivationPolicy::Regular)
    } else {
        app.set_activation_policy(ActivationPolicy::Accessory)
    };

    match result {
        Ok(_) => {
            set_icon_visibility(show_icon);
            if show_icon {
                println!("Show dock icon");
            } else {
                println!("Hide dock icon");
            }
            show_icon
        }
        Err(e) => {
            eprintln!("Failed to change dock icon visibility: {:?}", e);
            set_icon_visibility(false);
            false
        }
    }
}
