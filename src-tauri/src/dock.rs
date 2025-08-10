pub fn icon_visibility(show_icon: bool) {
    use cocoa::appkit::NSApplication;
    use cocoa::appkit::NSApplicationActivationPolicy::{
        NSApplicationActivationPolicyAccessory, NSApplicationActivationPolicyRegular,
    };
    use objc::*;

    let cls = objc::runtime::Class::get("NSApplication").unwrap();
    let app: cocoa::base::id = unsafe { msg_send![cls, sharedApplication] };
    unsafe {
        if show_icon {
            app.setActivationPolicy_(NSApplicationActivationPolicyRegular);
            println!("Show dock icon")
        } else {
            app.setActivationPolicy_(NSApplicationActivationPolicyAccessory);
            println!("Hide dock icon");
        }
    }
}
