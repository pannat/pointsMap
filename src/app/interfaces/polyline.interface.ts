import {IPoint} from './point.interface';

export interface IPolyline {
  id: string;
  name: string;
  points: Array<IPoint>;
}
