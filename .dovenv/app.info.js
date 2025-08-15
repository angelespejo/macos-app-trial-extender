
// @ts-check

// Must be type for used in UI
/**
 * @type {import('./types.ts').AppInfoConfig}
 */
export const data = {
	finalcut : {
		firstCompatibleVersion : '10.6.1',
		tests                  : [
			{
				appVersion : '10.7',
				user       : [ 'angelo' ],
			},
			{
				appVersion   : '11.1.1',
				referenceUrl : 'https://github.com/angelespejo/macos-app-trial-extender/pull/1',
				user         : [ 'yinmo19' ],
			},
			{
				appVersion : '11.1.1',
				osVersion  : '15.6',
				user       : [ 'angelo' ],
			},
		],
	},
	logicpro : {
		firstCompatibleVersion : '10.5.4',
		tests                  : [
			{
				appVersion : '10.8.0',
				user       : [ 'angelo' ],
			},
			{
				appVersion : '10.8.1',
				user       : [ 'angelo' ],
			},
			{
				appVersion   : '11.1.2',
				referenceUrl : 'https://github.com/angelespejo/macos-app-trial-extender/pull/1#issuecomment-3172794529',
				osVersion    : '15.6',
				user         : [ 'angelo' ],
			},
		],
	},
}

export default data
