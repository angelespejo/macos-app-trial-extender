/**
 * Todo.
 *
 * @description Todo.
 */

import {
	constructorLinks, imgUrl, 
} from '../_core.js'
import { mark } from './mark.js'

const createTableRow = ( name, type ) => `| <img src="https://github.com/${name}.png?size=72" alt="${name}" style="border-radius:100%"/> | ${name} |  ${type} | [@${name}](https://github.com/${name}) |`
	
const org          = pkg => {

	return `
## 👨‍💻 Development

You can contribute via **_Github_**.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](${pkg.data.repository.url}/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](${pkg.data.repository.url}/pulls)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](${pkg.data.funding.url})

## 📜 License

This software is licensed with **[GPLv3](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

_PigeonPosse_ is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/PigeonPosse/PigeonPosse)

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="${pkg.data.author.url}.png?size=72" alt="${pkg.data.author.name}" style="border-radius:100%"/> | ${pkg.data.author.name} |   Author & Development   | [@${pkg.data.author.name}](${pkg.data.author.url}) |
${createTableRow( 'YinMo19', 'Code Contributor' )}
${createTableRow( pkg.data.extra.collective.name, 'Collective' )}

</br>

<p align="center">

${webImgLinks( pkg )}

</p>`

}
const dataWebLinks = pkg => {

	return [
		{
			name : 'Web', color : 'grey', url : pkg.data.extra.collective.web, 
		},
		{
			name : 'About Us', color : 'grey', url : pkg.data.extra.collective.about,
		},
		{
			name : 'Donate', color : 'pink', url : pkg.data.funding.url,
		},
		{
			name : 'Github', logo : 'github', url : pkg.data.extra.collective.gh,
		},
		{
			name : 'Twitter', logo : 'twitter', url : pkg.data.extra.collective.social.twitter,
		},
		{
			name : 'Instagram', logo : 'instagram', url : pkg.data.extra.collective.social.instagram,
		},
		{
			name : 'Medium', logo : 'medium', url : pkg.data.extra.collective.social.medium,
		},
	]

}

const dataReleasesLinks = pkg => {

	return 	[
		{
			name : 'Macos Universal', url : pkg.data.extra.downloadUrl.macosUniversal,
		},
		{
			name : 'Macos Intel', url : pkg.data.extra.downloadUrl.macosIntel,
		},
		{
			name : 'Macos Silicon', url : pkg.data.extra.downloadUrl.macosSilicon,
		},
	]

}

const webImgLinks     = pkg => constructorLinks( dataWebLinks( pkg ), 'img' )
const releaseImgLinks = pkg => constructorLinks( dataReleasesLinks( pkg ), 'img' )

const header = pkg => {

	const releaseUrl = `${pkg.data.repository.url}/releases`
	return `
[![HEADER](docs/banner.png)](${releaseUrl})

${imgUrl( {
		name : 'License', color : 'green', type : 'github/license/pigeonposse/stylegpt',url : '/LICENSE',
	} )}
${imgUrl( {
		name : 'Github Releases', color : 'blue', type : `github/package-json/v/angelespejo/${pkg.data.name.toLowerCase()}`,url : releaseUrl,
	} )}

${pkg.data.description}

> This application is for development purposes only.

## Download

${releaseImgLinks( pkg )}

> [!CAUTION]
> Currently the app for Silicon is damaged, so it is advisable to install the app for macOS universal app

${imgUrl( {
		name : 'All releases', color : 'black', url : releaseUrl,
	} )}
`

}

const markFunct = pkg => {

	return `<!--\n${mark( pkg )}\n-->`

}

export const readme = pkg => {

	return {
		org    : org( pkg ),
		header : header( pkg ),
		mark   : markFunct( pkg ),
	}

}
