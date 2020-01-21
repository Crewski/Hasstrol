import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { EntityData } from '../models/entity_data';

@Component({
  selector: 'entity-tile',
  templateUrl: './entity-tile.component.html',
  styleUrls: ['./entity-tile.component.scss'],
})
export class EntityTileComponent implements OnInit {

  @Input() entity_id: string;
  entity: EntityData;
  active: boolean = false;
  calling: boolean = false;
  iconColor = 'rgb(255,255,255)'

  constructor(private _ws: WebsocketService, private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log(this.entity_id);
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
    this.calling = true;
    let domain = this.entity_id.split(".")[0];
    switch (domain) {
      case "light":
        this._ws.callService("light", "toggle", this.entity_id).then(data => {
          if (data.success) {
            this.calling = false;
          }
        })
        break;
    }
  }

  setIconDefault() {
    let domain = this.entity_id.split(".")[0];
    switch (domain) {
      case "light":
        this.entity.attributes['icon'] = "mdi:lightbulb";
        break;
    }
  }

  setActive() {

    let domain = this.entity_id.split(".")[0];
    switch (domain) {
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
          this.iconColor = 'rgb(255,255,255)';
        }
    }
  }

}
