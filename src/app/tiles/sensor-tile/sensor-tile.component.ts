import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { StorageService } from 'src/app/services/storage.service';
import { EntityData } from 'src/app/models/entity_data';

@Component({
  selector: 'app-sensor-tile',
  templateUrl: './sensor-tile.component.html',
  styleUrls: ['./sensor-tile.component.scss'],
})
export class SensorTileComponent implements OnInit {

  @Input() entity_id: string;
  @Input() roomIndex: number;
  @Input() entityIndex: number;

  entity: EntityData;

  constructor(
    private _ws: WebsocketService,
    private _cd: ChangeDetectorRef,
    public _storage: StorageService
  ) { }

  ngOnInit() {
    this._ws.getEntityData().subscribe(data => {
      if (data.findIndex(data => data.entity_id == this.entity_id) != -1) {
        this.entity = data.find(data => data.entity_id == this.entity_id);
        if (!this.entity.attributes['icon']) {
          this.setDefaultIcon();
        }
        this._cd.detectChanges();
      }
    })
  }

  onPress() {
    console.log("Call history modal");
  }

  deleteEntity() {
    this._storage.deleteEntity(this.roomIndex, this.entityIndex)
  }

  setDefaultIcon(){
    
    switch (this.entity.attributes['device_class']) {
      case "temperature":
        this.entity.attributes['icon'] = "mdi:thermometer";
        break;
      case "humidity":
        this.entity.attributes['icon'] = "mdi:water-percent";
        break;
      default:
        this.entity.attributes['icon'] = "mdi:eye";
        break;
    }
  }

}
