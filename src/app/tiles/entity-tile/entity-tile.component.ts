import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { EntityData } from '../../models/entity_data';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'entity-tile',
  templateUrl: './entity-tile.component.html',
  styleUrls: ['./entity-tile.component.scss'],
})
export class EntityTileComponent implements OnInit {

  @Input() entity_id: string;
  @Input() roomIndex: number;
  @Input() entityIndex: number;

  entity: EntityData;
  active: boolean = false;
  iconColor = 'rgb(255,255,255)';
  domain: string;

  constructor(private _ws: WebsocketService, private _cd: ChangeDetectorRef, private _storage: StorageService) {

  }

  ngOnInit() {
    this.domain = this.entity_id.split(".")[0];
    this._ws.getEntityData().subscribe(data => {
      if (data.findIndex(data => data.entity_id == this.entity_id) != -1) {
        this.entity = data.find(data => data.entity_id == this.entity_id);
        if (!this.entity.attributes['icon']) {
          this.setIconDefault();
        }
        this.setActive();
        this._cd.detectChanges();
      }
    })
  }

  onPress() {
    switch (this.domain) {
      case "person":
      case "device_tracker":
        console.log(this.entity);
        break;

      default:
        this._ws.callService(this.domain, "toggle", this.entity_id).then(data => {
          if (data.success) {
          }
        })
        break;
    }
  }

  setIconDefault() {
    if (this.entity.attributes['device_class']) {
      switch (this.entity.attributes['device_class']) {
        case "temperature":
          this.entity.attributes['icon'] = "mdi:thermometer";
          break;
        case "humidity":
          this.entity.attributes['icon'] = "mdi:water-percent";
          break;
        case "door":
          this.entity.attributes['icon'] = "mdi:door";
          break;

      }
    } else {
      switch (this.domain) {
        case "light":
          this.entity.attributes['icon'] = "mdi:lightbulb";
          break;
        case "sensor":
          this.entity.attributes['icon'] = "mdi:eye";
          break;
        case "switch":
          this.entity.attributes['icon'] = "mdi:flash";
          break;
          case "binary_sensor":
            this.entity.attributes['icon'] = "mdi:circle-outline";
            break;
        case "person":
        case "device_tracker":          
          this.entity.attributes['icon'] = "mdi:account";
          break;
      }
    }
  }

  setActive() {
    switch (this.domain) {
      case "light":
      case "switch":
      case "binary_sensor":
      case "input_boolean":
      case "binary_sensor":
        if (this.entity.state == 'on') {
          this.active = true;
          if (this.entity.attributes['rgb_color']) {
            this.iconColor = 'rgb(' + this.entity.attributes['rgb_color'].join(', ') + ')';
          } else {
            this.iconColor = 'rgb(255,165,0)';
          }
        } else {
          this.active = false;
          this.iconColor = 'rgb(0,0,0)';
        }
        break;
      case "sensor":
        this.active = true;
        this.iconColor = 'rgb(255,165,0)';
        break;
      case "device_tracker":
      case "person":
        if (this.entity.state == 'home'){          
        this.active = true;
        this.iconColor = 'rgb(255,165,0)';
        } else {          
          this.active = false;
          this.iconColor = 'rgb(0,0,0)';
        }
    }
  }

  deleteEntity() {
    this._storage.deleteEntity(this.roomIndex, this.entityIndex)
  }

}
