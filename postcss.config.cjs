/* eslint-disable @stylistic/array-element-newline */

/**
 * Tailwind config.
 *
 * @description Tailwind config.
 * @see https://tailwindcss.com/docs/
 * @see https://postcss.org/docs/
 */

const autoprefixer = require( 'autoprefixer' )
const tailwindcss  = require( 'tailwindcss' )

module.exports = { plugins : [
	// Some plugins, like tailwindcss/nesting, need to run before Tailwind,
	tailwindcss(),
	// But others, like autoprefixer, need to run after
	autoprefixer,
] }
