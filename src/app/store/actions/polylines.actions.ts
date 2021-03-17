/**
 * Создание действия
 */

import { Action } from '@ngrx/store';
import { Polyline } from '../../models/polyline';

/**
 * Определение типов действий
 */
export enum EPolylineActions {
  GetPolylines = '[Polylines] Get Polylines',
  GetPolylinesSuccess = '[Polylines] Get Polylines Success',
  AddPolyline = '[Polyline] Add Polyline',
  AddPolylineSuccess = '[Polyline] Add Polyline Success',
  GetPolylineSuccess = '[Polyline] Get Polyline Success'
}

/**
 * Создание классов действий
 */
export class GetPolylines implements Action {
  public readonly type = EPolylineActions.GetPolylines;
}

export class GetPolylinesSuccess implements Action {
  public readonly type = EPolylineActions.GetPolylinesSuccess;
  constructor(public payload: Array<Polyline>) {}
}

export class AddPolyline implements Action {
  public readonly type = EPolylineActions.AddPolyline;
  constructor(public payload: Polyline) {}
}

export class GetPolylineSuccess implements Action {
  public readonly type = EPolylineActions.GetPolylineSuccess;
  constructor(public payload: Polyline) {}
}

export class AddPolylineSuccess implements Action {
  public readonly type = EPolylineActions.AddPolylineSuccess;
  constructor(public payload: Polyline[]) {}
}

/**
 * Экспорт типа PolylinesActions для обеспечения проверки типов.
 * Например, могут быть использованы в reducer
 */
export type PolylineActions = GetPolylines | GetPolylinesSuccess | AddPolyline | AddPolylineSuccess | GetPolylineSuccess;
