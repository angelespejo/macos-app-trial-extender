import { CONTRIBUTOR_ROLE } from '@dovenv/repo'

import pkg from '../package.json' with { type: 'json' }

export const role = {
	...CONTRIBUTOR_ROLE,
	'brand-designer' : {
		name  : 'Brand Designer',
		emoji : '🎨',
		desc  : 'Contributor who design the brand (logo, banner, etc.)',
	},
	'tester' : {
		name  : 'Tester',
		emoji : '🧪',
		desc  : 'Contributor who test the application',
	},
}

/**
 * @satisfies {Record<string, import('@dovenv/repo').ContributorsConfig<typeof role>['member'][number]>}
 */
export const member = {
	angelo : {
		name       : 'Angelo',
		ghUsername : 'angelespejo',
		role       : 'author',
		url        : 'https://github.com/angelespejo',
	},
	alejo : {
		name       : 'Alejo Malia',
		ghUsername : 'alejomalia',
		role       : 'brand-designer',
		url        : 'https://github.com/alejomalia',
	},
	yinmo19 : {
		name       : 'YinMo19',
		ghUsername : 'YinMo19',
		role       : 'contributor',
		url        : 'https://github.com/YinMo19',
	},
	collective : {
		name       : pkg.extra.collective.name,
		ghUsername : pkg.extra.collective.id,
		role       : 'organization',
		url        : pkg.extra.collective.url,
	},
}

