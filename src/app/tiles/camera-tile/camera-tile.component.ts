import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { CameraModalComponent } from 'src/app/modals/camera-modal/camera-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { EntityData } from 'src/app/models/entity_data';

@Component({
  selector: 'app-camera-tile',
  templateUrl: './camera-tile.component.html',
  styleUrls: ['./camera-tile.component.scss'],
})
export class CameraTileComponent implements OnChanges, OnDestroy {

  @Input() entity_id: string;
  @Input() roomIndex: number;
  @Input() entityIndex: number;

  cameraimg: SafeResourceUrl;
  cameraInterval: any;
  entity: EntityData;

  constructor(private _ws: WebsocketService,
    private _sanitizer: DomSanitizer,
    private _storage: StorageService,
    private _modal: ModalController) {
  }

  ngOnChanges() {
    

    if (this.entity_id) {
      this._ws.getEntityData().subscribe(data => {
        if (data.findIndex(data => data.entity_id == this.entity_id) != -1) {
          this.entity = data.find(data => data.entity_id == this.entity_id);
        }
      })
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

  deleteEntity() {
    this._storage.deleteEntity(this.roomIndex, this.entityIndex)
  }

}
