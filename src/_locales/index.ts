import commonCa  from './ca/common.json'
import trayObjCa from './ca/tray.json'
import commonEn  from './en/common.json'
import trayObjEn from './en/tray.json'
import commonEs  from './es/common.json'
import trayObjEs from './es/tray.json'
import lang      from './lang.json'

export default {
	ca : {
		common : commonCa,
		tray   : trayObjCa,
		lang,
	},
	es : {
		common : commonEs,
		tray   : trayObjEs,
		lang,
	},
	en : {
		common : commonEn,
		tray   : trayObjEn,
		lang,
	},
}
export { lang }
