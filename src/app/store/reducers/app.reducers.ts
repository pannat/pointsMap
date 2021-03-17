/**
 * Создание редуктора приложения
 */

import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../state/app.state';
import { polylineReducers } from './polyline.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  polyline: polylineReducers
};
