import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  EPolylineActions,
  GetPolylinesSuccess,
  AddPolylineSuccess,
  GetPolylines,
  AddPolyline
} from '../actions/polylines.actions';
import { selectPolylineList } from '../selectors/polyline.selector';

@Injectable()
export class PolylineEffects {
  @Effect()
  getPolylines$ = this.actions$.pipe(
    ofType<GetPolylines>(EPolylineActions.GetPolylines),
    switchMap(() => this.store.pipe(select(selectPolylineList))),
    switchMap((polylines) => of(new GetPolylinesSuccess(polylines)))
  );

  @Effect()
  addPolyline$ = this.actions$.pipe(
    ofType<AddPolyline>(EPolylineActions.AddPolyline),
    map((action) => action.payload),
    withLatestFrom(this.store.pipe(select(selectPolylineList))),
    switchMap(([newPolyline, polylines]) => {
      const updatedPolylines = [...polylines, newPolyline];
      return of(new AddPolylineSuccess(updatedPolylines));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
