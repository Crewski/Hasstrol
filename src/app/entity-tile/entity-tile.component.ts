import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private _ws: WebsocketService) {
  }

  ngOnInit() {
    console.log(this.entity_id);
    this._ws.getEntityData().subscribe(data => {
      if (data.findIndex(data => data.entity_id == this.entity_id) != -1) {
        this.entity = data.find(data => data.entity_id == this.entity_id);
        if(!this.entity.attributes['icon']){
          this.setIconDefault();
        }
        this.setActive();
      }
    })
  }

  onPress() {    
    let domain = this.entity_id.split(".")[0];
    switch (domain){
      case "light":
        this._ws.callService("light", "toggle", this.entity_id)
        break;
    }
  }

  setIconDefault(){
    let domain = this.entity_id.split(".")[0];
    switch (domain){
      case "light":
        this.entity.attributes['icon'] = "mdi:lightbulb";
        break;
    }
  }

  setActive(){
    
    let domain = this.entity_id.split(".")[0];
    switch (domain){
      case "light":
        this.active = this.entity.state == 'on' ? true : false;
    }
  }

}
