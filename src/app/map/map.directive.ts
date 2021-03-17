import { Directive, ElementRef, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Loader, LoaderOptions } from 'google-maps';
import { ActionsSubject } from '@ngrx/store';
import { EPolylineActions } from '../store/actions/polylines.actions';
import { takeUntil } from 'rxjs/operators';
import { from, Subject} from 'rxjs';
import { IPoint } from '../interfaces/point.interface';

@Directive({
  selector: '[googleMap]',
})
export class MapDirective implements OnInit, OnDestroy {
  @Output() addPoint = new EventEmitter();

  private destroy$ = new Subject();
  private readonly options: LoaderOptions = {};
  private readonly loader: Loader = new Loader('', this.options);
  private map!: google.maps.Map;
  private poly!: google.maps.Polyline;
  private markers: Array<google.maps.Marker> = [];
  private readonly Coordinates = {
    ZELENOGRAD: {
      lat: 55.98,
      lng: 37.18
    }
  };

  constructor(
    private readonly element: ElementRef,
    private readonly actionsSubject: ActionsSubject
  ) {}

  ngOnInit(): void {
    from(this.loader.load())
      .pipe(takeUntil(this.destroy$))
      .subscribe((google) => {
          this.map = new google.maps.Map(this.element.nativeElement, {
            center: this.Coordinates.ZELENOGRAD,
            zoom: 13,
          });

          this.poly = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
          });
          this.poly.setMap(this.map);

          this.map.addListener('click', this.onMapClick.bind(this));
      });

    // Прослушиваем сохранение полилиний
    this.actionsSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.type === EPolylineActions.AddPolyline) {
          this.clearMap();
        }
      });
  }

  ngOnDestroy(): void {
    // отписываемся от всех Observable
    this.destroy$.next();
  }

  /**
   * Возвращает массив координат текущей полилинии
   */
  private getCoordinates(): Array<IPoint> {
    return this.poly
      .getPath()
      .getArray()
      .map((it) => (
        {
            lat: it.lat(),
            lng: it.lng()
        })
      );
  }

  /**
   * Очищает карту
   */
  private clearMap(): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
    this.poly.getPath().clear();
  }

  /**
   * Обработчик клика по карте.
   * Добавляет точку в полилинию
   * Добавляет маркер на карту
   */
  private onMapClick(event: google.maps.MapMouseEvent): void {
    const path = this.poly.getPath();
    path.push(event.latLng);
    const index = path.getLength() - 1;

    const marker = new google.maps.Marker({
      position: event.latLng,
      map: this.map,
      draggable: true
    });

    marker.addListener('dragend', () => {
      const latLng = marker.getPosition();
      if (latLng) {
        path.removeAt(index);
        path.insertAt(index, latLng);
        this.addPoint.emit(this.getCoordinates());
      }
    });

    this.addPoint.emit(this.getCoordinates());
    this.markers.push(marker);
  }
}
