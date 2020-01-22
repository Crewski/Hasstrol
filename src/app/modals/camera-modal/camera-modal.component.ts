import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { StorageService } from 'src/app/services/storage.service';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
})
export class CameraModalComponent implements OnInit {

  @Input() entity_id: string;
  stream: any;

  constructor(private _ws: WebsocketService,
              private _storage: StorageService,
              private _modal: ModalController) {
   }

  ngOnInit() {
    this._ws.getCameraStream(this.entity_id).then(res => {
      console.log(res);
      this._storage.getMainURL().then(url => {        
      this.stream = url + res.result.url;
      })
    })
  }

  closeModal(){
    console.log("trying to close");
    this._modal.dismiss();
  }

}
