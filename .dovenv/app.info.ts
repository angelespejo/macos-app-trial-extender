
import { member } from './contributors.js'

import type { AppInfoConfig } from './types'

export const data : AppInfoConfig = {
	finalcut : {
		firstCompatibleVersion : '10.6.1',
		tests                  : [
			{
				appVersion : '10.7',
				user       : [ member.angelo ],
			},
			{
				appVersion : '11.1.1',
				user       : [ member.yinmo19 ],
			},
			{
				appVersion : '11.1.1',
				osVersion  : '15.6',
				user       : [ member.angelo ],
			},
		],
	},
	logicpro : {
		firstCompatibleVersion : '10.5.4',
		tests                  : [
			{
				appVersion : '10.8.0',
				user       : [ member.angelo ],
			},
			{
				appVersion : '10.8.1',
				user       : [ member.angelo ],
			},
			{
				appVersion : '11.1.2',
				osVersion  : '15.6',
				user       : [ member.angelo ],
			},
		],
	},
}

export default data
