import {ActionReducer, MetaReducer} from '@ngrx/store';
import {State} from '../router/reducers';
import {localStorageSync} from 'ngrx-store-localstorage';
import {persistStoreModules} from 'src/app/config/persisted.modules';

const keys = ['core'].concat(persistStoreModules);

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys, rehydrate: true})(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-store, provide an array of meta-store
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
