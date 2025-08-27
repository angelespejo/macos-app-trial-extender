/* eslint-disable one-var */

// @fork https://github.com/oMaN-Rod/svelte-persisted-state/tree/v1.2.0

type Serializer<T> = {
	parse     : ( text: string ) => T
	stringify : ( object: T ) => string
}

type StorageType = 'local' | 'session' | 'cookie'

type CookieOptions = {
	expireDays? : number
	maxAge?     : number
	path?       : string
	domain?     : string
	secure?     : boolean
	sameSite?   : 'Strict' | 'Lax' | 'None'
	httpOnly?   : boolean
}

type Options<T> = {
	storage?       : StorageType
	serializer?    : Serializer<T>
	syncTabs?      : boolean
	cookieOptions? : CookieOptions
	onWriteError?  : ( error: unknown ) => void
	onParseError?  : ( error: unknown ) => void
	beforeRead?    : ( value: T ) => T
	beforeWrite?   : ( value: T ) => T
}

const getCookie = ( name: string ): string | null => {

	const match = document.cookie.match( new RegExp( '(^| )' + name + '=([^;]+)' ) )
	return match ? decodeURIComponent( match[2] ) : null

}

const setCookie = ( name: string, value: string, options: CookieOptions = {} ) => {

	const {
		expireDays = 365,
		maxAge,
		path = '/',
		domain,
		secure = false,
		sameSite = 'Lax',
		httpOnly = false,
	} = options

	let cookieString = `${name}=${encodeURIComponent( value )}`
	cookieString    += `; path=${path}`

	// Use max-age if specified, otherwise use expires
	if ( maxAge !== undefined ) {

		cookieString += `; max-age=${maxAge}`

	}
	else {

		const expires = new Date( Date.now() + expireDays * 864e5 ).toUTCString()
		cookieString += `; expires=${expires}`

	}

	if ( domain ) {

		cookieString += `; domain=${domain}`

	}

	if ( secure ) {

		cookieString += `; secure`

	}

	cookieString += `; samesite=${sameSite}`

	if ( httpOnly ) {

		cookieString += `; httponly`

	}

	document.cookie = cookieString

}

const getStorage = ( type: StorageType, cookieOptions: CookieOptions = {} ) => {

	if ( type === 'local' )
		return {
			getItem : ( k: string ) => localStorage.getItem( k ),
			setItem : ( k: string, v: string ) => localStorage.setItem( k, v ),
		}
	if ( type === 'session' )
		return {
			getItem : ( k: string ) => sessionStorage.getItem( k ),
			setItem : ( k: string, v: string ) => sessionStorage.setItem( k, v ),
		}
	// cookie
	return {
		getItem : getCookie,
		setItem : ( k: string, v: string ) => setCookie( k, v, cookieOptions ),
	}

}

export type PersistedResult<T> = {
	/**
	 * The current value of the persisted state
	 */
	current  : T
	/**
	 * Function to RESET the persisted state
	 *
	 * @returns {void} - Reset the persisted state
	 */
	reset    : () => void
	/**
	 * Check if a value already exists in storage, ignoring the default initial value.
	 *
	 * @returns {boolean} True if a value exists in storage, false otherwise.
	 */
	isStored : () => boolean
}

export type PersistedParams<T> = {
	/**
	 * The key used to store the value in the chosen storage
	 */
	key          : string
	/**
	 * The initial value used if no stored value exists
	 */
	initialValue : T
	/**
	 * Optional settings
	 */
	options?     : Options<T>
}

/**
 * Creates a reactive store whose value is persisted in the specified storage area.
 * It supports localStorage, sessionStorage, or cookies, with custom serialization
 * and optional synchronization across browser tabs.
 *
 * @template                      T
 * @param    {PersistedParams<T>} data              - An object containing the parameters for the persisted store
 * @param    {string}             data.key          - The key used to store the value in the chosen storage
 * @param    {T}                  data.initialValue - The initial value used if no stored value exists
 * @param    {Options<T>}         [data.options]    - Optional settings, including:
 *                                                  - storage: 'local' | 'session' | 'cookie' (default: 'local')
 *                                                  - serializer: object with `parse` and `stringify` methods (default: JSON)
 *                                                  - syncTabs: boolean indicating whether to synchronize changes across tabs (default: true)
 *                                                  - cookieOptions: configuration for cookies if storage='cookie'
 *                                                  - onWriteError: callback on write errors
 *                                                  - onParseError: callback on parse errors
 *                                                  - beforeRead: function to modify value after reading from storage
 *                                                  - beforeWrite: function to modify value before writing to storage
 * @returns  {PersistedResult<T>}                   A reactive store object with:
 *                                                  - `value`: getter for the current value
 *                                                  - `current`: getter/setter for the current value (Svelte-style)
 *                                                  - `reset()`: method to reset the value to `initialValue`
 * @example
 * ```ts
 * import { persistedState } from './persistedState.ts';
 *
 * const userPrefs = persistedState({
 *   key: 'user-preferences',
 *   initialValue: { theme: 'light', fontSize: 14 },
 *   options: {
 *     storage: 'local',
 *     syncTabs: true,
 *     beforeWrite: (v) => ({ ...v, lastUpdated: Date.now() })
 *   }
 * });
 *
 * // Reading the value
 * console.log(userPrefs.value);
 *
 * // Updating the value
 * userPrefs.current = { theme: 'dark', fontSize: 16 };
 *
 * // Resetting to initial value
 * userPrefs.reset();
 * ```
 */
export const persistedState = <T>( data: PersistedParams<T> ): PersistedResult<T> => {

	const {
		key, initialValue, options = {},
	} = data

	const {
		storage = 'local',
		serializer = JSON,
		syncTabs = true,
		cookieOptions = {},
		onWriteError = console.error,
		onParseError = console.error,
		beforeRead = ( v: T ) => v,
		beforeWrite = ( v: T ) => v,
	} = options

	// Handle backward compatibility with cookieExpireDays
	const finalCookieOptions: CookieOptions = { ...cookieOptions }

	const browser     = typeof window !== 'undefined' && typeof document !== 'undefined'
	const storageArea = browser ? getStorage( storage, finalCookieOptions ) : null

	let storedValue: T

	try {

		const item  = storageArea?.getItem( key )
		storedValue = item ? beforeRead( serializer.parse( item ) ) : initialValue

	}
	catch ( error ) {

		onParseError( error )
		storedValue = initialValue

	}

	let state = $state( storedValue )

	const updateStorage = ( value: T ) => {

		try {

			const valueToStore = beforeWrite( value )
			storageArea?.setItem( key, serializer.stringify( valueToStore ) )

		}
		catch ( error ) {

			onWriteError( error )

		}

	}

	if ( syncTabs && typeof window !== 'undefined' && storage === 'local' ) {

		window.addEventListener( 'storage', event => {

			if ( event.key === key && event.storageArea === localStorage ) {

				try {

					const newValue = event.newValue ? serializer.parse( event.newValue ) : initialValue
					state          = beforeRead( newValue )

				}
				catch ( error ) {

					onParseError( error )

				}

			}

		} )

	}

	$effect.root( () => {

		$effect( () => {

			updateStorage( state )

		} )

		return () => {}

	} )
	const hasValueInStorage = (): boolean => {

		try {

			const item = storageArea?.getItem( key )
			return item !== null // existe en storage

		}
		catch {

			return false

		}

	}
	return {
		/**
		 *
		 * Get the current value
		 *
		 * @returns {T} The current value
		 */
		get current() {

			return state

		},
		/**
		 * Set the current value
		 *
		 */
		set current( newValue: T ) {

			state = newValue

		},
		reset() {

			state = initialValue

		},
		isStored(): boolean {

			return hasValueInStorage()

		},
	}

}

