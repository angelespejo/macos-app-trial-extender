/* eslint-disable one-var */
import { onchangeState } from './_super/_shared/onchange.svelte'
import { addStore }      from './_super/store'

const appStore =  addStore( { autoSave: true } )

export type TauriPersistedResult<T> = {
	/**
	 * The current value of the persisted state
	 */
	current  : T
	/**
	 * Function to RESET the persisted state
	 *
	 * @returns {Promise<void>} - Reset the persisted state
	 */
	reset    : () => Promise<void>
	/**
	 * The current error of the async state.
	 *
	 * @type {Error | undefined}
	 * @readonly
	 */
	error?   : Error
	/**
	 * Whether the async state is currently loading.
	 *
	 * @type {boolean}
	 * @readonly
	 */
	loading  : boolean
	/**
	 * Check if a value already exists in storage, ignoring the default initial value.
	 *
	 * @returns {Promise<boolean>} True if a value exists in storage, false otherwise.
	 */
	isStored : () => Promise<boolean>
}

export type TauriPersistedParams<T> = {
	/**
	 * The key used to store the value in the chosen storage
	 */
	key          : string
	/**
	 * The initial value used if no stored value exists
	 */
	initialValue : T
}

/**
 * Creates a reactive state that is persisted in the user's data directory
 * using the Tauri store.
 *
 * @template                                    T    The type of the value stored in the persisted state.
 * @param    {TauriPersistedParams<T>}          data - The parameters for the persisted state.
 * @returns  {Promise<TauriPersistedResult<T>>}      A reactive state that can be used to display the value, loading state and any errors.
 */
export const appPersistentState = <T>( data: TauriPersistedParams<T> ): TauriPersistedResult<T> => {

	const {
		key,
		initialValue,
	} = data

	let state   = $state<T>( initialValue )
	let loading = $state( false )
	let error   = $state<Error | undefined>( undefined )

	const set = async ( newValue: T ) => {

		try {

			loading = true
			await appStore.set( key, newValue )
			await appStore.save()
			loading = false

		}
		catch ( err ) {

			error   = err as Error
			loading = false

		}

	}

	;( async () => {

		try {

			loading      = true
			const stored = await appStore.get<T>( key )
			if ( stored !== null && stored !== undefined ) {

				state = stored

			}
			else {

				await appStore.set( key, initialValue )
				await appStore.save()

			}
			loading = false

		}
		catch ( err ) {

			error   = err as Error
			loading = false

		}

	} )()

	onchangeState( () => set( state ) )
	const loadingState = $derived( loading )
	return {
		loading : loadingState,
		get current() {

			return state

		},
		set current( newValue: T ) {

			state = newValue

		},
		reset : async () => {

			try {

				state = initialValue
				await appStore.set( key, initialValue )
				await appStore.save()

			}
			catch ( err ) {

				error = err as Error

			}

		},
		isStored : async () => {

			const storedValue = await appStore.get<T>( key )
			return storedValue !== null && storedValue !== undefined

		},
		error,
	}

}
