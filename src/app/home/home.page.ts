import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  savedEntities = ["light.front_door", "light.back_door", "light.kitchen_table", "light.kitchen_island", "light.under_cabinet", "light.garage_entrance", "sensor.washing_machine_current"];

  constructor(private _ws: WebsocketService) {
    
  }

  stream() {
    this._ws.getCameraStream('camera.amcrest_camera');
  }

}
