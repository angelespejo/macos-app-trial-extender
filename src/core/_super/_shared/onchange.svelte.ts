export const onchangeState = ( cb : () => Promise<void> | void ) => {

	$effect.root( () => {

		$effect( () => {

			cb()

		} )

	} )

}
