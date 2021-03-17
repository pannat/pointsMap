import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { MapComponent } from './map/map.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MapDirective } from './map/map.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PolylineEffects } from './store/effects/polyline.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([PolylineEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    NzLayoutModule,
    NzPageHeaderModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzListModule,
    NzInputModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
