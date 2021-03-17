/**
 * Создание состояния приложения
 */

import { RouterReducerState } from '@ngrx/router-store';
import { IPolylineState, initialPolylineState } from './polyline.state';

export interface IAppState {
  router?: RouterReducerState;
  polyline: IPolylineState;
}

export const initialAppState: IAppState = {
  polyline: initialPolylineState
};

/**
 * Возвращает начальное состояние приложения
 */
export const getInitialState = (): IAppState => {
  return initialAppState;
};

