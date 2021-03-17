/**
 * Создание редуктора полилиний
 */

import {EPolylineActions, PolylineActions} from '../actions/polylines.actions';
import {initialPolylineState, IPolylineState} from '../state/polyline.state';

export const polylineReducers = (state = initialPolylineState, action: PolylineActions): IPolylineState => {
  switch (action.type) {
    case EPolylineActions.GetPolylinesSuccess: {
      return {
        ...state,
        polylines: action.payload
      };
    }
    case EPolylineActions.AddPolylineSuccess: {
      return {
        ...state,
        polylines: action.payload
      };
    }
    // case EPolylineActions.GetPolylineSuccess: {
    //   return {
    //     ...state,
    //     selectedPolyline: action.payload
    //   };
    // }



    default:
      return state;
  }
};
