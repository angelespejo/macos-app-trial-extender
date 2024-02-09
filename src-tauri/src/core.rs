use std::fs;
use std::path::PathBuf;
use tauri::api::path::home_dir;


fn get_logic_path() -> Result<PathBuf, String> {
    let mut path = home_dir().ok_or_else(|| "Failed to get home directory".to_string())?;
    path.push("Library/Application Support/.lpxuserdata");
    Ok(path)
}

fn get_finalcut_path() -> Result<PathBuf, String> {
    let mut path = home_dir().ok_or_else(|| "Failed to get home directory".to_string())?;
    path.push("Library/Application Support/.ffuserdata");
    Ok(path)
}

#[tauri::command]

pub fn reset_trial_data() -> Result<(), String> {

    let logic_pro_path = get_logic_path()?;
    let final_cut_path = get_finalcut_path()?;

    if logic_pro_path.exists() {
        fs::remove_file(&logic_pro_path)
            .map_err(|e| format!("Failed to remove Logic Pro trial data: {}", e))?;
    }

    if final_cut_path.exists() {
        fs::remove_file(&final_cut_path)
            .map_err(|e| format!("Failed to remove Final Cut Pro trial data: {}", e))?;
    }

    Ok(())
}

#[tauri::command]
pub fn reset_trial_data_watcher( app: tauri::AppHandle, activate: bool) {

    app.tray_handle().get_item("automate").set_selected(activate).unwrap();
    println!("tray item automate changed to {}", activate);

}
