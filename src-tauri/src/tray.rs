use tauri::{
    api::shell::open, 
    Manager, 
    App,
    AppHandle, 
    SystemTrayEvent, 
    SystemTray, 
    CustomMenuItem, 
    SystemTrayMenu, 
    SystemTrayMenuItem,
};


#[path = "./dock.rs"] mod dock;

fn handle_system_tray_event(app: &AppHandle, event_type: &str, event_data: &str) {
    if let Some(window) = app.get_window("main") {
        if !window.is_visible().expect("winvis") {
            dock::icon_visibility(true);
            window.show().unwrap();
            // item_handle.set_title("Hide").unwrap();
        }
        
        window.set_focus().unwrap();

        window.eval(&format!(
            "window.dispatchEvent(new CustomEvent('system-tray-event', {{ detail: {{ from: 'system-tray', type: '{}', data: '{}' }} }}));",
            event_type, event_data
        )).unwrap();
    }
}

fn handle_event( app: &AppHandle, event: SystemTrayEvent) {
    
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            // let item_handle = app.tray_handle().get_item(&id);

            match id.as_str() {
                "open-page" => {
                    match app.get_window("main") {
                        Some(window) => match window.is_visible().expect("winvis") {
                            true => {   
                                window.set_focus().unwrap();
                                return;
    
                            }
                            false => {
                                dock::icon_visibility(true);
                                window.show().unwrap();
                                window.set_focus().unwrap();
                            },
                        },
                        None => return,
                    };
                }
                "support" => {

                    open(&app.shell_scope(), "https://pigeonposse.com/?popup=donate&iconflow", None).unwrap();

                }
                "automate" => {
                    handle_system_tray_event(&app , "automate", "");
                }
                "reset" => {
                    handle_system_tray_event(&app , "reset", "");
                }
                "settings" => {
                    handle_system_tray_event(&app, "open-page", "settings");
                }
                "info" => {
                    handle_system_tray_event(&app, "open-page", "info");
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            }
        }
        _ => {}
    }
    
}

fn create_menu() -> SystemTrayMenu{

    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let open = CustomMenuItem::new("open-page".to_string(), "Open dashboard");
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");
    let reset = CustomMenuItem::new("reset".to_string(), "Reset trial versions");
    let automate = CustomMenuItem::new("automate".to_string(), "Automation");


    let info = CustomMenuItem::new("info".to_string(), "About");
    let support = CustomMenuItem::new("support".to_string(), "Donate");

    let tray_menu = SystemTrayMenu::new()
        .add_item(open)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(reset)
        .add_item(automate)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(settings)
        .add_item(info)
        .add_item(support)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    tray_menu

}

pub fn create(app: &App) -> SystemTray {

    let config = app.config();
    let package_config = config.package.clone(); 
    let tool_tip_name = package_config.product_name.clone(); 
    let app_handle = app.handle();

    let system_tray = SystemTray::new()
        .with_menu(create_menu())
        .with_tooltip( if let Some(name) = &tool_tip_name {
            name.as_str()
        } else {
            "No App Name"
        } )
        .on_event(move |event| {
            handle_event( &app_handle, event);
        });

    system_tray

}