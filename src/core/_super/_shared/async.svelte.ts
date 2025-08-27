export type AsyncStateResult<T> = {
	/**
	 * The current value of the async state.
	 *
	 * @type {T}
	 * @readonly
	 */
	current : T | undefined
	/**
	 * The current error of the async state.
	 *
	 * @type {Error | undefined}
	 * @readonly
	 */
	error?  : Error
	/**
	 * Whether the async state is currently loading.
	 *
	 * @type {boolean}
	 * @readonly
	 */
	loading : boolean
}

export type AsyncStateParams<T> = {
	/**
	 * A function that returns a promise that resolves with the value to be stored in the state.
	 *
	 * @type {( data:{ signal?: AbortSignal } ) => Promise<T>}
	 */
	fn            : ( data: { signal?: AbortSignal } ) => Promise<T>
	/**
	 * The initial value of the async state.
	 *
	 * @type {T}
	 */
	initialValue? : T
}

/**
 * Svelte State with ASYNC support
 *
 * Creates a reactive state that will call the `getter` function,
 * and keep track of its loading state and any errors that might occur.
 *
 * @template                                                   T
 * @param    {AsyncStateParams<T>}                             data                - The parameters for the async state.
 * @param    {( data:{ signal?: AbortSignal } ) => Promise<T>} data.getter         - A function that returns a promise that resolves with the value to be stored in the state.
 * @param    {T}                                               [data.initialValue] - The initial value of the state.
 * @returns  {AsyncStateResult<T>}                                                 A reactive state that can be used to display the value, loading state and any errors.
 * @example
 *
 * ```svelte
 * <!-- // Using $derived to react to a dependent state -->
 * <script lang="ts">
 *   import { asyncState } from './asyncState.ts'
 *
 *   let draft = $state('7')
 *   let schema = $derived(asyncState({fn:async ({ signal }) => {
 *     const url = `https://json-schema.org/draft-0${draft}/schema`
 *     const res = await fetch(url, { signal })
 *     return await res.json()
 *   }}))
 * </script>
 *
 * <input type="number" bind:value={draft} />
 * {#if schema.loading}
 *   <p>Loading schema for draft {draft}...</p>
 * {:else if schema.error}
 *   <p style="color:red">Error: {schema.error.message}</p>
 * {:else if schema.current}
 *   <pre>{JSON.stringify(schema.value, null, 2)}</pre>
 * {/if}
 * ```
 * @example
 * ```svelte
 * <!-- Without $derived, manually re-creating asyncState on change -->
 * <script lang="ts">
 *   import { asyncState } from './asyncState.ts'
 *
 *   let draft = $state('7')
 *   let schema
 *   $effect(() => {
 *     schema = asyncState({fn:async ({ signal }) => {
 *       const url = `https://json-schema.org/draft-0${draft}/schema`
 *       const res = await fetch(url, { signal })
 *       return await res.json()
 *     }})
 *   })
 * </script>
 *
 * <input type="number" bind:value={draft} />
 *
 * {#if schema?.loading}
 *   <p>Loading schema for draft {draft}...</p>
 * {:else if schema?.error}
 *   <p style="color:red">Error: {schema.error.message}</p>
 * {:else if schema?.current}
 *   <pre>{JSON.stringify(schema.value, null, 2)}</pre>
 * {/if}
 * ```
 */
export const asyncState = <T>( data: AsyncStateParams<T> ): AsyncStateResult<T> => {

	const {
		fn, initialValue,
	} = data
	const _rune = $state<AsyncStateResult<T>>( {
		current : initialValue,
		loading : true,
	} )

	$effect( () => {

		const controller = new AbortController()
		const { signal } = controller

		_rune.loading = true

		const run = async () => {

			try {

				const data    = await fn( { signal } )
				_rune.current = data
				_rune.error   = undefined
				_rune.loading = false

			}
			catch ( error ) {

				if ( error instanceof Error ) {

					if ( error?.name !== 'AbortError' )
						_rune.error = error

				}
				else _rune.error = new Error( String( error ) )
				_rune.loading = false

			}

		}

		run()

		return () => controller.abort()

	} )

	return {
		get current() {

			return _rune.current

		},
		get error() {

			return _rune.error

		},
		get loading() {

			return _rune.loading

		},
	}

}
