import { Component, ViewChild } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { StorageService } from '../services/storage.service';
import { IonSlides } from '@ionic/angular';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  @ViewChild('roomSlides', { static: false }) roomSlides: IonSlides;

  savedEntities = ["light.front_door", "light.back_door", "light.kitchen_table", "light.kitchen_island", "light.under_cabinet", "light.garage_entrance", "sensor.washing_machine_current"];

  constructor(private _ws: WebsocketService,
    public _storage: StorageService,
    private _roomsService: RoomsService) {
    this._roomsService.getRoomIndex().subscribe(index => {
      if (index) {
        
     console.log("Room Index = " + index);
        this.gotoSlide(index - 1);
      }

    })
  }



  public gotoSlide(index: number) {
    this.roomSlides.slideTo(index);
  }

}
