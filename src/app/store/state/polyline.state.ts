/**
 * Создание состояния полилиний
 */
import { Polyline } from '../../models/polyline';

export interface IPolylineState {
  polylines: Array<Polyline>;
  selectedPolyline: Polyline | null;
}

/**
 * Возвращает начальное состояние полилиний
 */
export const initialPolylineState: IPolylineState = {
  polylines: [],
  selectedPolyline: null
};
