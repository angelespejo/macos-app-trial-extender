import {
	LazyStore,
	type StoreOptions,
} from '@tauri-apps/plugin-store'

export const addStore = ( opts?: Partial<StoreOptions> & { path?: string } ) => {

	const {
		path, ...rest
	} = opts || {}
	return new LazyStore( path || 'settings.json', rest as StoreOptions )

}
