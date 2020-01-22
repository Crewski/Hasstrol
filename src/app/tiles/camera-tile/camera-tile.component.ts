import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { CameraModalComponent } from 'src/app/modals/camera-modal/camera-modal.component';

@Component({
  selector: 'app-camera-tile',
  templateUrl: './camera-tile.component.html',
  styleUrls: ['./camera-tile.component.scss'],
})
export class CameraTileComponent implements OnChanges, OnDestroy {

  @Input() entity_id: string;
  cameraimg: SafeResourceUrl;
  cameraInterval: any;

  constructor(private _ws: WebsocketService,
    private _sanitizer: DomSanitizer,
    private _modal: ModalController) {
  }

  ngOnChanges() {
    if (this.entity_id) {
      this._ws.getThumbnail(this.entity_id).then(res => {
        this.cameraimg = this._sanitizer.bypassSecurityTrustUrl("data:Image/*;base64," + res.result.content);
      })
      this.cameraInterval = setInterval(() => {
        this._ws.getThumbnail(this.entity_id).then(res => {
          this.cameraimg = this._sanitizer.bypassSecurityTrustUrl("data:Image/*;base64," + res.result.content);
        })
      }, 10000)
    }
  }

  ngOnDestroy(){
    if(this.cameraInterval){
      clearInterval(this.cameraInterval);
    }
  }

  async getStream(){
    const modal = await this._modal.create({
      component: CameraModalComponent,
      componentProps: {'entity_id': this.entity_id}
    })
    return await modal.present();
  }

}
