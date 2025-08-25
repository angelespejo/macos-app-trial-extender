import unocss from '@svaio/unocss'

export const theme: NonNullable<Parameters<typeof unocss>[0]>['theme'] = {
	shadow : {
		sidebar : '0 0 80px 0px rgba(0, 0, 0, 0.3)',
		btn     : '0 0 10px 0 rgba(0, 0, 0, 0.3)',
		dot     : '0 0 5px 0 rgba(0, 0, 0, 0.3)',
	},
	/**
	 * Colors of interface.
	 *
	 * @see https://uicolors.app/create
	 * @see https://www.tints.dev/
	 */
	colors : {
		primary : {
			50  : '#f6f6f6',
			100 : '#e7e7e7',
			200 : '#d1d1d1',
			300 : '#b0b0b0',
			400 : '#888888',
			500 : '#6d6d6d',
			600 : '#5d5d5d',
			700 : '#4f4f4f',
			800 : '#454545',
			900 : '#3d3d3d',
			950 : '#282828',
		},
		gray : {
			50  : '#f6f6f6',
			100 : '#e7e7e7',
			200 : '#d1d1d1',
			300 : '#b0b0b0',
			400 : '#888888',
			500 : '#6d6d6d',
			600 : '#5d5d5d',
			700 : '#4f4f4f',
			800 : '#454545',
			900 : '#3d3d3d',
			950 : '#282828',
		},
	},
}
