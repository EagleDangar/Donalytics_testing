import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import * as time_data from './../assets/time_series_data.json';
import * as heatmap_data from './../assets/heatmap_data.json';
import * as markerdata from './../assets/heatmap_data.json';
import * as campaign_da1 from './../assets/Campaign_data_firestore.json';
// import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
// import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
// import 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet.heat';
// import '../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
// import 'leaflet.markercluster';
import DataFrame , { Row } from 'dataframe-js';
import { ApiService } from './strip.service';
import { Observable } from 'rxjs/Observable';
// import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { RadioControlValueAccessor } from '@angular/forms';
// import * as Stripe from 'stripe';
// const stripe = new Stripe('sk_test_xtz7vzUNDhyFM1leNDKmLLAW');

// console.log(time_data);
declare var HeatmapOverlay;
// console.log(heatmap_data);
// console.log(markerdata);



// export interface Campaignd { name: string; isChild: boolean; }
// export interface SubCampaignd { name: string; isChild: boolean; parent_id: string; }
// export interface Sponsorshipd {name: string; isChild: boolean; parent_id: string; }
// export interface Subsponsorshipd {name: string; amount: string; parent_id: string; }

// console.log(stripe.charges.list());


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

//     items: Observable<any[]>;
//     private itemsCollection: AngularFirestoreCollection<Campaignd>;

//     sub_campaign: Observable<any[]>;
//   public sub_campaignCollection: AngularFirestoreCollection<SubCampaignd>;

//   sponsorship: Observable<any[]>;
//   public sponsCollection: AngularFirestoreCollection<Sponsorshipd>;

//   subsponsorship: Observable<any[]>;
//   public subsponsCollection: AngularFirestoreCollection<Subsponsorshipd>;



// mapbox heatmap child
map1: Map;
map3: Map;
result: any;
   // @ViewChild('map1') map1: Map;
        time_data1 = [];
        list_of_campaigns1 = [];
        list_of_campaign_type1 = [];
        Quarter1 = [];
        Quarter2 = [];
        Quarter3 = [];
        Quarter4 = [];
        Total_donation = [];
        camp_data = [];
        camp_data1 = [];
        // data = products;
        stripe_metadata = [];
        stripe_timedata = [];
        stripe_amount = [];
        Donation_cmapign_types: Object;
        new_campaign_plot: Object;
        colors = ['#9bd1ff', '#45444a', '#66ff75', '#fca252'];
        colors1 = ['#94c6ff', '#57565c', '#75ff83', '#ffaa59'];
        campaignTypesData = [];
        campaignsData = [];
        latitude = [];
        longitude = [];
        campaigns = [];
        sub_campaigns = [];
        sponsor = [];
        sub_sponsor = [];
        amount = [];
        in_Series_data = [];
        Series_data = [];
        drilldown_data = [];
        i;
        j;
        r;
        dataLen;
        drillDataLen;
        brightness;
        temp;
        starting_after;
        data1 = {
            data: []
        };
// variables of Campaign Types chart ends here


// variables of marker cluster
        // LAYER_OSM = {
        //     id: 'openstreetmap',
        //     name: 'Open Street Map',
        //     enabled: false,
        //     layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //         maxZoom: 18,
        //         attribution: 'Open Street Map'
        //     })
        // };

        // markericon;
        // // layersControlOptions = { position: 'bottomright' };
        // baseLayers = {
        //     'Open Street Map': this.LAYER_OSM.layer
        // };
        // options = {
        //     zoom: 6,
        //     center: L.latLng([ 54., -2.4360])
        // };

        // markerClusterGroup: L.MarkerClusterGroup;
        // markerClusterData: any[] = [];
        // markerClusterOptions: L.MarkerClusterGroupOptions;

// marker cluster's options end


  // variable of time series chart
  time_series: Object;

 // variables of heatmap
//   heatmap_options: object;

//   heatmapLayer = new HeatmapOverlay({
//     radius: 20,
//     maxOpacity: 0.65,
//     minOpacity: 0,
//     // blur: 15,
//     scaleRadius: false,
//     useLocalExtrema: false,
//     latField: 'lat',
//     lngField: 'lng',
//     valueField: 'count',
//     gradient: {.4: 'blue', .6: 'cyan', .7: 'lime' , .8: 'yellow', 1: 'red'}
//   });

//  onMapReady(map: L.Map) {
//        for (this.r = 0 ; this.r < Object.keys(heatmap_data).length; this.r++) {
//         this.data1.data.push({
//             lat: heatmap_data[this.r][0],
//             lng: heatmap_data[this.r][1],
//             count: heatmap_data[this.r][2]
//           });
//     }
//       this.heatmapLayer.setData(this.data1);
//   }

// heatmap's main part ends here

// marker cluster main part

//   generateData() {

//     const markers: any[] = [];

//     for (let i = 0; i < Object.keys(markerdata).length; i++) {
//         const message = 'Donation Made From Here : £ ' + markerdata[i][2];
//          this.markericon = L.icon({
//             iconUrl: '/../../assets/marker-icon.png',
//             shadowUrl: '/../../assets/marker-shadow.png'
//         });
//         markers.push(L.marker([markerdata[i][0] , markerdata[i][1]], { icon: this.markericon, title: message }).bindPopup(message));
//     }

//     this.markerClusterData = markers;

// }
//     markerClusterReady(group: L.MarkerClusterGroup) {

//     this.markerClusterGroup = group;

//     }

    // marker cluster main part's end is here

ngOnInit() {
    

    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
    .set('pk.eyJ1IjoiZGFuZ2FyIiwiYSI6ImNqZHN2dTVmajF6bGIycW1rM3NoM254N3QifQ.wj09f7ZqdbteAaHAcARpOw');
    //  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuZ2FyIiwiYSI6ImNqZHN2dTVmajF6bGIycW1rM3NoM254N3QifQ.wj09f7ZqdbteAaHAcARpOw';

      this.map1 = new Map({
        container: 'map1',
        style: 'mapbox://styles/mapbox/dark-v9',
        zoom: 5,
        center: [-2.4360, 54.]
      });
      this.map3= new Map({
        container: 'map3',
        style: 'mapbox://styles/mapbox/dark-v9',
        zoom: 5,
        center: [-2.4360, 54.]
      });
  
      this.map1.on('style.load', this.onLoad.bind(this));

      this.map3.on('style.load', this.onLoad1.bind(this));
    }
// mapbox heatmap onLoad

onLoad() {
    console.log('map is loaded, can I still talk to it?');
    this.map1.addSource('donations', {
      'type': 'geojson',
      'data': '/../assets/donation_data.geojson'
  });

  this.map1.addLayer({
      'id': 'donations-heat',
      'type': 'heatmap',
      'source': 'donations',
      'maxzoom': 9,
      'paint': {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'donation'],
              0, 0,
              100, 3,
              200, 5,
              400, 12,
              500, 16
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              11, 1,
              15, 4,
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.6, 'rgb(253,219,199)',
              0.8, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)'
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 2,
              9, 20,
             11, 25,

          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              6, 1,
              20, 0
          ],
      }
  }, 'waterway-label');

  this.map1.addLayer({
      'id': 'donations-point',
      'type': 'circle',
      'source': 'donations',
      'minzoom': 7,
      'paint': {
          // Size circle radius by earthquake magnitude and zoom level
          'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7, [
                  'interpolate',
                  ['linear'],
                  ['get', 'donation'],
                  50, 1,
                  100, 2,
                  250, 4,
                  400, 7,
                  500, 9,
              ],
              16, [
                  'interpolate',
                  ['linear'],
                  ['get', 'donation'],
                  1, 5,
                  6, 20,
              ]
          ],
          // Color circle by earthquake magnitude
          'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'donation'],
              0, 'rgba(236,222,239,0)',
              100, 'rgb(240,222,239)',
              200, 'rgb(208,209,230)',
              300, 'rgb(166,189,219)',
              400, 'rgb(103,169,207)',
              500, 'rgb(28,144,153)',

          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          // Transition from heatmap to circle layer by zoom level
          'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9, 0,
              15, 1
          ]
      }
  }, 'waterway-label');
  this.map1.on('click', 'donations-point', (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML('<b>Donation Made From Here : £ </b> ' + e.features[0].properties.donation)
      .addTo(this.map1);
  });

  }
  onLoad1(){
    console.log('marker map is loaded, can I still talk to it?');
    this.map3.addSource('donations', {
      'type': 'geojson',
      'data': '/../assets/donation_data.geojson',
      cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)

  });
  this.map3.addLayer({
    id: "clusters",
    type: "circle",
    source: "donations",
    filter: ["has", "point_count"],
    paint: {
        // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1"
        ],
        "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40
        ]
    }
});

this.map3.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "donations",
    filter: ["has", "point_count"],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
        "icon-image": "emptyMarker",
    }
});

this.map3.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "donations",
    filter: ["!has", "point_count"],
    paint: {
        "circle-color": "#11b4da",
        "circle-radius": 8,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
    }
});
this.map3.on('click', 'unclustered-point', (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML('<b>Donation Made From Here : £ </b> ' + e.features[0].properties.donation)
      .addTo(this.map3);
  });
  }
// ends here

// all Charts are here in constructor

constructor(private api: ApiService  ) {

   
//     this.itemsCollection = db.collection<Campaignd>('campaign_sample');
//     this.items = db.collection('campaign_sample').valueChanges();

//     this.sub_campaignCollection = db.collection<SubCampaignd>('sub_camp_sample');
//     this.sub_campaign = db.collection('sub_camp_sample').valueChanges();

//     this.sponsCollection = db.collection<Sponsorshipd>('sponsorship');
//     this.sponsorship = db.collection('sponsorship').valueChanges();

//     this.subsponsCollection = db.collection<Subsponsorshipd>('sub_sponsorship');
//     this.subsponsorship = db.collection('sub_sponsorship').valueChanges();
// // new campaign chart starts here


// this.items.forEach((doc) => {
//     console.log(doc);


// });
// this.sub_campaign.forEach((doc) => {
//     console.log(doc);
// });

// var temp1 = null
// var starting_after1 = null
//     this.api.getallcharges(starting_after1).subscribe((res) => {
//         console.log('here : ');
//         temp1 = res;

//         res['data'].forEach(element => {
//             this.stripe_metadata.push(element['metadata']);
//             this.stripe_timedata.push(element['created']);
//         });
//         starting_after1 = res['data'][9]['id'];
//         // console.log(this.stripe_metadata);
//         console.log(temp1.has_more);
//         console.log(starting_after1);
    
//         while(temp1['has_more'])
//             {
//         this.api.getallcharges(starting_after1).subscribe((res1) => {
//                 console.log('here : ');
//                 temp1 = res1;
//                 console.log(res1);
//                 res1.data.forEach(element => {
//                     this.stripe_metadata.push(element['metadata']);
//                     this.stripe_timedata.push(element['created']);
//                 });
//                 starting_after1 = res1['data'][9]['id'];
                
//             });}
//             console.log(this.stripe_metadata);
//             // console.log(temp1.has_more);
//             console.log(this.stripe_metadata.length);
//             console.log(starting_after1);
//     })     




// this.api.getallcharges().subscribe((res) => {
//     console.log(res);
//     this.stripe_metadata = res.md;
//     this.stripe_timedata = res.td;
//     this.stripe_amount = res.amount;
//     for (p = 0; p < this.stripe_metadata.length; p++ ) {
//             if(this.stripe_metadata[p]!==undefined){
//             this.latitude.push(this.stripe_metadata[p]['latitude']);
//             this.longitude.push(this.stripe_metadata[p]['longitude']);
//         }
//         else{
//             this.latitude.push(0);
//             this.longitude.push(0);
//         }
// }   
//     this.time_data1 = this.stripe_timedata.map(function(e, i) {
//         return [e, this.stripe_amount[i]];
//       }); 
//       console.log(this.time_data1)
//     const stripe_df = new DataFrame({'amount':this.stripe_amount , 'latitude': this.latitude
//     , 'longitude' : this.longitude, 'timestamp' : this.stripe_timedata },
//     ['amount', 'latitude', 'longitude', 'timestamp'
//     ]);
//     // stripe_df.show(42);
//     const time_df = stripe_df.select('timestamp','amount')
//     time_df.sortBy('timestamp')
//     this.time_data1=time_df.toArray();
//     console.log(this.time_data1);
    
//     this.time_series = {
//         rangeSelector : {
//             selected : 1
//         },
//         title : { text : 'Donation Time Series' },
//     series: [{
//             name: 'Donation Data',
//             type: 'area',
//             data: this.time_data1,
//             tooltip: {
//             valueDecimals: 2
//         }
//     }],
//     responsive: {
//         rules: [{
//             condition: {
//                 maxWidth: 600
//             },
//             chartOptions: {
//                 chart: {
//                     width: 1300,
//                     height: 500
//                 },
//                 subtitle: {
//                     text: null
//                 },
//                 navigator: {
//                     enabled: false
//                 }
//             }
//         }]
//     },
//     exporting: {
//         enabled : true,
//         filename: 'Donation Time Series'
//     },
//     };
// });

let p = 0 ;
let q = 0 ;
 for (p = 0; p < Object.keys(campaign_da1).length; p++ ) {
                this.campaigns.push(campaign_da1[p]['Campaigns']);
                this.sub_campaigns.push(campaign_da1[p]['Sub_Campaigns']);
                this.sponsor.push(campaign_da1[p]['Sponsorship']);
                this.sub_sponsor.push(campaign_da1[p]['Sub_Sponsorship']);
                this.amount.push(campaign_da1[p]['amount']);
            }

const up_df = new DataFrame({'Campaign': this.campaigns , 'Sub_Campaign': this.sub_campaigns
                , 'Sponsorship' : this.sponsor, 'Sub_sponsorship' : this.sub_sponsor,
            'Amount' : this.amount, },
                ['Campaign', 'Sub_Campaign', 'Sponsorship', 'Sub_sponsorship', 'Amount'
                ]);
// up_df.show();

const up_df2 = up_df.groupBy('Campaign').aggregate((group => group.stat.sum('Amount'))
            ).rename('aggregation', 'Total_donation_per_campaign');

// const up_df12 = up_df.innerJoin(up_df2, 'Campaign');
// up_df2.show();
const up_df3 = up_df.groupBy('Campaign', 'Sub_Campaign').aggregate((group => group.stat.sum('Amount'))
            ).rename('aggregation', 'Total_donation_per_sub_campaign');

// const up_df13 = up_df12.innerJoin(up_df3, 'Sub_Campaign');
// up_df3.show();
const up_df4 = up_df.groupBy('Campaign', 'Sub_Campaign', 'Sponsorship').aggregate((group => group.stat.sum('Amount'))
).rename('aggregation', 'Total_donation_per_sponsorship');
// up_df4.show();
const up_df5 = up_df.groupBy('Campaign', 'Sub_Campaign', 'Sponsorship', 'Sub_sponsorship').aggregate((group => group.stat.sum('Amount'))
).rename('aggregation', 'Total_donation_per_sub_sponsorship');
// up_df5.show();
// const up_df14 = up_df.innerJoin(up_df4, 'Sponsorship');

const d1 = up_df2.toDict();
const d2 = up_df3.toDict();
const d3 = up_df4.toDict();
const d4 = up_df5.toDict();

// console.log(d1);
// console.log(d2);
// console.log(d3);
// console.log(d4);

const k1 = Object.keys(d1);
const k2 = Object.keys(d2);
const k3 = Object.keys(d3);
const k4 = Object.keys(d4);

const naew = {};
naew['name'] = 'Campaigns';
// naew['type'] = 'column',
naew['innerSize'] = '30%';
naew['colorByPoint'] = true;
naew['size'] = '100%',
naew['showInLegend'] = true,
naew['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
for ( q = 0 ; q < ((d1[k1[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d1['Campaign'][q];
    s_dict['y'] = d1['Total_donation_per_campaign'][q];
    s_dict['drilldown'] = d1['Campaign'][q];
    this.in_Series_data.push(s_dict);
}
naew['data'] = this.in_Series_data;
this.Series_data.push(naew);
console.log(this.Series_data);


for ( q = 0 ; q < ((d1[k1[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d1['Campaign'][q];
    s_dict['id'] = d1['Campaign'][q];
    s_dict['size'] = '100%',
    s_dict['showInLegend'] = true,
    s_dict['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
    const l_data = [];
    for ( p = 0 ; p < ((d2[k2[0]]).length); p++ ) {
                    const data_dict = {};
    if (d2['Campaign'][p] === d1['Campaign'][q])    {
        data_dict['name'] = d2['Sub_Campaign'][p];
        data_dict['drilldown'] = d2['Sub_Campaign'][p];
        data_dict['y'] = d2['Total_donation_per_sub_campaign'][p];
        l_data.push(data_dict);
            }
    s_dict['data'] = l_data;
    }
    this.drilldown_data.push(s_dict);
}
// console.log(this.drilldown_data);
for ( q = 0 ; q < ((d2[k2[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d2['Sub_Campaign'][q];
    s_dict['id'] = d2['Sub_Campaign'][q];
    s_dict['size'] = '100%';
    s_dict['showInLegend'] = true;
    s_dict['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
    const l_data = [];
    for ( p = 0 ; p < ((d3[k3[0]]).length); p++ ) {
        const data_dict = {};
    if (d3['Sub_Campaign'][p] === d2['Sub_Campaign'][q])    {
        data_dict['name'] = d3['Sponsorship'][p];
        data_dict['drilldown'] = d3['Sponsorship'][p] + 'of' + d3['Sub_Campaign'][p];
        data_dict['y'] = d3['Total_donation_per_sponsorship'][p];
        l_data.push(data_dict);
    }
    s_dict['data'] = l_data;
    }
    this.drilldown_data.push(s_dict);
}
// console.log(this.drilldown_data);

for ( q = 0 ; q < ((d3[k3[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d3['Sponsorship'][q];
    s_dict['id'] = d3['Sponsorship'][q]  + 'of' + d3['Sub_Campaign'][q];
    s_dict['size'] = '100%';
    s_dict['showInLegend'] = false;
    s_dict['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
    const l_data = [];
    for ( p = 0 ; p < ((d4[k4[0]]).length); p++ ) {
        const data_dict = {};
    if (d4['Sponsorship'][p]  + 'of' + d4['Sub_Campaign'][p] === d3['Sponsorship'][q]  + 'of' + d3['Sub_Campaign'][q])    {
        data_dict['name'] = d4['Sub_sponsorship'][p];
        data_dict['y'] = d4['Total_donation_per_sub_sponsorship'][p];
        l_data.push(data_dict);
    }
    s_dict['data'] = l_data;
            }
    this.drilldown_data.push(s_dict);
            }
console.log(this.drilldown_data);

this.new_campaign_plot = {

            chart: {
                type: 'pie',
                spacingBottom: -155,
            spacingTop: 50,
            spacingLeft: 0,
spacingRight: 0,
        height: 500,
        width: 1200

            },
            title: {
        text: 'Donation Per Campaigns',
            align: 'center',
            },

    legend: {
        backgroundColor : '#FFFFFF',
        floating : true,
        x: 20,
        y: -180,
        labelFormatter : function () {
                return this.name + ':</b> £ ' + this.y;
                }
            },
    exporting: {
        enabled : true,
        filename : 'Donation chart'
        },
            plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
            }
        },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
            innerSize: '30%',
                startAngle: -90,
                endAngle : 90,
                shadow : false,
                center : ['50%', '50%']
            }
            },
            tooltip: {
                valuePrefix: ' £ '
            },
    series: this.Series_data,
    drilldown: {
        innersize : '30%',
        activeAxisLabelStyle: {
            textDecoration: 'none',
            fontStyle: 'italic'
        },
        activeDataLabelStyle: {
            textDecoration: 'none',
            fontStyle: 'italic'
            },
        drillUpButton: {
            position: {
            align : 'right' ,
            verticalAlign: 'top',
            x: -150,
            y: -50
            },
        relativeTo : 'plotBox',
                },

        series: this.drilldown_data
                    },

            };
// Campaign chart ends here


 // Creating Time Series chart
                this.time_series = {
                    rangeSelector : {
                        selected : 1
                    },
                    title : { text : 'Donation Time Series' },
                series: [{
                        name: 'Donation Data',
                        type: 'area',
                        data: time_data,
                        tooltip: {
                        valueDecimals: 2
                    }
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 600
                        },
                        chartOptions: {
                            chart: {
                                width: 1300,
                                height: 500
                            },
                            subtitle: {
                                text: null
                            },
                            navigator: {
                                enabled: false
                            }
                        }
                    }]
                },
                exporting: {
                    enabled : true,
                    filename: 'Donation Time Series'
                },
                };
// Time Series's end is here


// Creating leaflet Heat map
            // this.heatmap_options = {
            //     layers: [
            //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            //         maxZoom: 20,
            //         }),
            //         this.heatmapLayer
            //     ],
            //     zoom: 6,
            //     center: L.latLng([ 54., -2.4360]),
            // };

// leaflet Heat map's end is here


// marker cluster data

    // this.generateData();

// marker cluster's end is here
}

liveSee() {
    console.log("---------------------   All  Data ------------------")
    console.log(this.stripe_metadata);
    console.log(this.stripe_timedata);
}
}
