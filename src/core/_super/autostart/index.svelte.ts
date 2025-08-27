// import { Autostart }  from './index'
// import { asyncState } from '../_shared/async.svelte'

// type AutostartStateProps = { initValue: boolean }
// export class AutostartState {

// 	#core
// 	current : boolean | undefined
// 	loading : boolean = true
// 	error   : Error | undefined

// 	#runAsync( fn: () => Promise<boolean> ) {

// 		const status = asyncState( { fn } )
// 		this.current = status.current
// 		this.loading = status.loading
// 		this.error   = status.error
// 		return status

// 	}

// 	constructor( { initValue = false }: AutostartStateProps ) {

// 		this.#core = new Autostart()
// 		this.#runAsync( async () => {

// 			if ( initValue === true ) return await this.#core.enable()
// 			if ( initValue === false ) return await this.#core.disable()
// 			return await this.#core.getStatus()

// 		} )

// 	}

// 	enable() {

// 		return this.#runAsync( () => this.#core.enable() )

// 	}

// 	disable() {

// 		return this.#runAsync( () => this.#core.disable() )

// 	}

// 	toggle() {

// 		return this.#runAsync( () => this.#core.toggle() )

// 	}

// }
