import { gitPlugin } from '@dovenv/repo'

export default gitPlugin( { commit : {
	types : [
		{
			value : ':sparkles: feat',
			title : '✨ feat',
			desc  : 'A new feature or feature request',
		},
		{
			value : ':bug: fix',
			title : '🐛 fix',
			desc  : 'Fixing a bug',
		},
		{
			value : ':memo: docs',
			title : '📝 docs',
			desc  : 'Add or update documentation',
		},
		{
			value : ':lipstick: style',
			title : '💄 style',
			desc  : 'Add or update styles, UI, or UX',
		},
		{
			value : ':recycle: refactor',
			title : '♻️  refactor',
			desc  : 'Code change that neither fixes a bug nor adds a feature',
		},
		{
			value : ':zap: perf',
			title : '⚡️ perf',
			desc  : 'Code change that improves performance',
		},
		{
			value : ':white_check_mark: test',
			title : '✅ test',
			desc  : 'Adding test cases',
		},
		{
			value : ':truck: chore',
			title : '🚚 chore',
			desc  : 'Changes to the build process or auxiliary tools and libraries (e.g., documentation generation)',
		},
		{
			value : ':rewind: revert',
			title : '⏪️ revert',
			desc  : 'Revert to a previous commit',
		},
		{
			value : ':construction: wip',
			title : '🚧 wip',
			desc  : 'Work in progress',
		},
		{
			value : ':construction_worker: build',
			title : '👷 build',
			desc  : 'Add or update related to build process',
		},
		{
			value : ':green_heart: ci',
			title : '💚 ci',
			desc  : 'Add or update related to CI process',
		},
	],
	scopes : [
		{
			value : 'core',
			desc  : 'Core functionality of the application',
		},
		{
			value : 'app',
			desc  : 'Application functionality',
		},
		{
			value : 'env',
			desc  : 'Reference for workspace environment',
		},
		{
			value : 'all',
			desc  : 'Reference all changes affecting multiple scopes',
		},
	],
} } )
