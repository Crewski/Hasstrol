import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { StorageService } from 'src/app/services/storage.service';
import { EntityData } from 'src/app/models/entity_data';

@Component({
  selector: 'app-light-tile',
  templateUrl: './light-tile.component.html',
  styleUrls: ['./light-tile.component.scss'],
})
export class LightTileComponent implements OnInit {

  @Input() entity_id: string;
  @Input() roomIndex: number;
  @Input() entityIndex: number;
  
  entity: EntityData;
  active: boolean = false;
  iconColor: string = 'rgb(0,0,0)';

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
          this.entity.attributes['icon'] = "mdi:lightbulb";
        }
        this.setActive();
        this._cd.detectChanges();
      }
    })
  }

  setActive() {  
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
  }

  onPress(){
    this._ws.callService("light", "toggle", this.entity_id).then(res => {
      console.log(res);
    })
  }

  deleteEntity() {
    this._storage.deleteEntity(this.roomIndex, this.entityIndex)
  }

}
