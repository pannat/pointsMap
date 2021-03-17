import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IPolylineState } from '../state/polyline.state';

const selectPolylines = (state: IAppState) => state.polyline;

export const selectPolylineList = createSelector(
  selectPolylines,
  (state: IPolylineState) => state.polylines
);
