import { Component, OnInit, Input } from '@angular/core';
import { EntityData } from '../models/entity_data';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GoogleMaps,
  GoogleMap,
  Environment,
  Marker,
  GoogleMapsAnimation,
  GoogleMapsMapTypeId,
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.page.html',
  styleUrls: ['./map-view.page.scss'],
})
export class MapViewPage implements OnInit {

  entity: EntityData;
  map: GoogleMap

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.entity = this._router.getCurrentNavigation().extras.state.entity;
      }
    });
  }

  async ngOnInit(){
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyA-sevHPVcxy-qdkUvx7-faVu5pvVyJ03I',
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyA-sevHPVcxy-qdkUvx7-faVu5pvVyJ03I'
    })

    // this.map = GoogleMaps.create(this.element.nativeElement);


    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.entity.attributes['latitude'],
          lng: this.entity.attributes['longitude']
        },
        zoom: 15,
      },
      
    });

    let marker: Marker = this.map.addMarkerSync({
      position: {
        lat: this.entity.attributes['latitude'],
        lng: this.entity.attributes['longitude']
      }
      });
  }

  closeModal(){
    this._router.navigate(['../'], { relativeTo: this._route });
  }

}
