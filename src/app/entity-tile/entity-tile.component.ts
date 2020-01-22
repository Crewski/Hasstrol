import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { EntityData } from '../models/entity_data';
import { StorageService } from '../services/storage.service';

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
  isEditing: boolean = false;
  domain: string;

  constructor(private _ws: WebsocketService, private _cd: ChangeDetectorRef, private _storage: StorageService) {
    this._storage.editingStatus().subscribe(res => this.isEditing = res);
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
    let domain = this.entity_id.split(".")[0];
    switch (domain) {
      case "light":
        this._ws.callService("light", "toggle", this.entity_id).then(data => {
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
      }
    }
  }

  setActive() {
    switch (this.domain) {
      case "light":
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
      case "climate":
        if (this.entity.state != 'off'){
          this.active = true;
        } else {
          this.active = false;
        }
    }
  }

  deleteEntity() {
    this._storage.deleteEntity(this.roomIndex, this.entityIndex)
  }

}
