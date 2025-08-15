
import type {
	role,
	member,
} from './contributors.js'
import type { ContributorsConfig } from '@dovenv/repo'

export type AppInfoConfigTest = {
	/**
	 * Application version of final cut or logic pro
	 *
	 * @example '10.5.4'
	 */
	appVersion    : string
	/**
	 * Operating system version
	 *
	 * @example '15.6'
	 */
	osVersion?    : string
	/**
	 * Status of the test
	 *
	 * @default 'success'
	 */
	status?       : 'success' | 'failure' | 'skipped'
	/**
	 * Link to the test discussion if exists
	 *
	 * @example 'https://github.com/angelespejo/macos-app-trial-extender/issues/1'
	 */
	referenceUrl? : string
	/**
	 * Users who have taken the test.
	 *
	 * Add a user ID from the `./.dovenv/contributors.js` file
	 */
	user?         : ( keyof typeof member )[]
}

export type AppInfoConfig = {
	/**
	 * Final Cut Pro options
	 */
	finalcut : {
		/**
		 * Fist version of Final Cut Pro that is compatible with this application.
		 */
		firstCompatibleVersion : string
		/**
		 * Versions of Final Cut Pro that are tested
		 */
		tests                  : AppInfoConfigTest[]
	}
	/**
	 * Logic Pro options
	 */
	logicpro : {
		/**
		 * Fist version of Logic Pro that is compatible with this application.
		 */
		firstCompatibleVersion : string
		/**
		 * Versions of Logic Pro that are tested
		 */
		tests                  : AppInfoConfigTest[]
	}
}

export type AppInfoID = keyof AppInfoConfig

export type Roles = typeof role
export type Members = Record<keyof typeof member, ContributorsConfig<Roles>['member'][number]>
export type Contributors = {
	role   : Roles
	member : Members
}
