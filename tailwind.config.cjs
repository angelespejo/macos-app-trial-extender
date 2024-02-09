/**
 * Tailwind config.
 *
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://flowbite.com/docs/
 */

const config = {
	content : [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
	],
	plugins : [
		require( 'flowbite/plugin' ),
	],
	darkMode : 'media',
	theme    : {
		extend : {
			boxShadow : {
				sidebar : '0 0 80px 0px rgba(0, 0, 0, 0.3)',
				btn     : '0 0 10px 0 rgba(0, 0, 0, 0.3)',
				dot     : '0 0 5px 0 rgba(0, 0, 0, 0.3)',
			},
			colors : {
				/**
				 * Colors of interface.
				 *
				 * @see https://uicolors.app/create
				 * @see https://www.tints.dev/
				 */
				// secondary : { 
				// 	'50'  : '#f9f7fd',
				// 	'100' : '#f1edfa',
				// 	'200' : '#e4ddf7',
				// 	'300' : '#d0c3ef',
				// 	'400' : '#b39ce4',
				// 	'500' : '#9676d6',
				// 	'600' : '#7e58c5',
				// 	'700' : '#6a45ab',
				// 	'800' : '#604096',
				// 	'900' : '#4a3172',
				// 	'950' : '#2f1a51',
				// },
				primary : { 
					50  : '#EEF9FB',
					100 : '#DDF2F8',
					200 : '#B8E4F0',
					300 : '#96D7E8',
					400 : '#70C8E0',
					500 : '#4EBBD9',
					600 : '#29A0C1',
					700 : '#207A93',
					800 : '#155061',
					900 : '#0B2A32',
					950 : '#051519',
				},
				gray : {
					50  : '#F6F7F9',
					100 : '#EDF0F2',
					200 : '#DCE0E5',
					300 : '#CDD4DA',
					400 : '#BBC4CD',
					500 : '#95A3B1',
					600 : '#6F8295',
					700 : '#526170',
					800 : '#38424C',
					900 : '#1C2126',
					950 : '#0D0F12',
				},
			},
		},
	},
}

module.exports = config
