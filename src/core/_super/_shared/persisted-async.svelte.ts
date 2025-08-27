import {
	asyncState,
	type AsyncStateResult,
	type AsyncStateParams,
} from './async.svelte'
import {
	persistedState,
	type PersistedResult,
	type PersistedParams,
} from './persisted.svelte'

export type AsyncPersistedParams<T> = PersistedParams<T> & Pick<AsyncStateParams<T>, 'fn'>
export type PersistedAsyncResult<T> = Pick<PersistedResult<T>, 'reset'> & AsyncStateResult<T>

/**
 * Creates a reactive state that will call the `getter` function,
 * and keep track of its loading state and any errors that might occur.
 *
 * The `getter` function is called with an AbortSignal argument,
 * which can be used to cancel the current request if a new one is triggered.
 *
 * The `persistedState` is automatically updated with the new value
 * each time the getter is called.
 *
 * @template                           T    The type of the value returned by the getter.
 * @param    {AsyncPersistedParams<T>} data - The parameters for the persisted state.
 * @returns  {PersistedAsyncResult<T>}      A reactive state that can be used to display the value, loading state and any errors.
 */
export const asyncPersistedState =  <T>( data:AsyncPersistedParams<T> ): PersistedAsyncResult<T> => {

	const {
		key, fn, initialValue, options,
	} = data

	const storage = persistedState<T>( {
		key,
		initialValue,
		options,
	} )

	const asyncSt = asyncState<T>( {
		fn : async props => {

			const data      = await fn( props )
			storage.current = data
			return data

		},
		initialValue : storage.current,
	} )

	return {
		...asyncSt,
		reset() {

			storage.reset()

		},
	}

}
