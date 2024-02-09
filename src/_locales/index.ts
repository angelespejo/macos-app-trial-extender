/**
 * Lang index.
 *
 * @description Lang index.
 */

import commonCa  from './ca/common.json'
import trayObjCa from './ca/tray.json'
import commonEs  from './es/common.json'
import trayObjEs from './es/tray.json'
import commonEn  from './en/common.json'
import trayObjEn from './en/tray.json'
import lang      from './lang.json'

type Tray = {[key: string]: string}

const trayCa: Tray = trayObjCa
const trayEs: Tray = trayObjEs
const trayEn: Tray = trayObjEn

export default {
	ca : {
		common : commonCa,
		tray   : trayCa,
		lang,
	},
	es : {
		common : commonEs,
		tray   : trayEs,
		lang,
	},
	en : {
		common : commonEn,
		tray   : trayEn,
		lang,
	},
}
export { lang }
