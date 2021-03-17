import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectPolylineList } from '../store/selectors/polyline.selector';
import { AddPolyline, GetPolylines } from '../store/actions/polylines.actions';
import { Observable } from 'rxjs';
import { IAppState } from '../store/state/app.state';
import { IPoint } from '../interfaces/point.interface';
import { Polyline } from '../models/polyline';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements OnInit {
  private points: Array<IPoint> = [];
  public newPolyline: Polyline | null = null;
  public polylines$: Observable<Array<Polyline>> = this.store.pipe(select(selectPolylineList));

  constructor(
    private readonly store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetPolylines());
  }

  /**
   * Получает из MapDirective координаты точки.
   * И добавляет к маршруту
   */
  public onAddPoint(points: Array<IPoint>): void {
    this.points = points;
  }

  /**
   * Добавляет новую полилинию в хранилище
   */
  public addPolyline(): void {
    this.store.dispatch(new AddPolyline(new Polyline('', this.points)));
    this.points = [];
  }

  /**
   * Редактирование
   */
  public savePolyline(): void {
    // TODO:
  }

  /**
   * Удаление
   */
  public removePolyline(): void {
    // TODO:
  }
}
