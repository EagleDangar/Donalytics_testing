import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AppComponent } from './app.component';
// import { ChartComponent } from './chart/chart.component';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
// import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster/dist/leaflet-markercluster/leaflet-markercluster.module';

// import { MapBoxModule } from 'angular2-mapbox/core';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireStorageModule } from 'angularfire2/storage';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import {firebaseConfig} from '../environments/firebase.config';
import { ApiService } from './strip.service';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}


@NgModule({
  declarations: [
    AppComponent,
   // ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartModule.forRoot(require('highcharts/highstock'),
    require('highcharts/modules/exporting'), require('highcharts/modules/drilldown')),
    HttpModule,
    // LeafletModule.forRoot(),
    // LeafletDrawModule.forRoot(),
    // LeafletMarkerClusterModule.forRoot(),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    // AngularFireStorageModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
