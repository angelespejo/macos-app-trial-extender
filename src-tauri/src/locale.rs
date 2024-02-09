
#[tauri::command]
pub async fn backend_i18n( app_handle: tauri::AppHandle, lang_obj: serde_json::Value, lang_id: String) -> String {

    let tray_handle = app_handle.tray_handle();

    lang_obj.as_object().map(|obj| {
        for (tray_key, title) in obj {
            if let Some(title_str) = title.as_str() {
                tray_handle.get_item(tray_key).set_title(title_str).expect("error");
            } else {
                println!("Didn't match a value for tray.{} in locale file", tray_key);
            }
        }
    });

    println!("Changed language in backend to {}", lang_id);
    format!("success")
}
