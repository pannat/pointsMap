import { IPoint } from '../interfaces/point.interface';
import { IPolyline } from '../interfaces/polyline.interface';
import { nanoid } from 'nanoid';

export class Polyline implements IPolyline {
  id: string;
  name: string;
  points: Array<IPoint>;

  constructor(name: string, points: Array<IPoint>) {
    this.id = nanoid();
    this.name = name;
    this.points = points;
  }

  public setPoints(points: Array<IPoint>): void {
    this.points = points;
  }
}
