import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { StorageService } from 'src/app/services/storage.service';
import { EntityData } from 'src/app/models/entity_data';

@Component({
  selector: 'app-climate-tile',
  templateUrl: './climate-tile.component.html',
  styleUrls: ['./climate-tile.component.scss'],
})
export class ClimateTileComponent implements OnInit {

  @Input() entity_id: string;
  @Input() roomIndex: number;
  @Input() entityIndex: number;
  
  entity: EntityData;
  active: boolean = false;
  iconColor: string = 'rgb(0,0,0)';
  backgroundColor: string = 'transparent';
  borderColor: string = 'transparent';

  constructor(
    private _ws: WebsocketService,
    private _cd: ChangeDetectorRef,
    public _storage: StorageService
  ) { }

  ngOnInit() {
    this._ws.getEntityData().subscribe(data => {
      if (data.findIndex(data => data.entity_id == this.entity_id) != -1) {
        this.entity = data.find(data => data.entity_id == this.entity_id);
        this.setActive();
        this._cd.detectChanges();
      }
    })
  }

  setActive() {  
    if (this.entity.state != 'off') {
      this.active = true;
      if (this.entity.state == 'heat'){
        this.borderColor = 'rgb(255,0,0)';
        this.iconColor = 'rgb(255,0,0)';
      } else if (this.entity.state == 'cool'){
        this.borderColor = 'rgb(0,0,255)';
        this.iconColor = 'rgb(0,0,255)';
      }
      if(this.entity.attributes['hvac_action'] == 'heating'){
        this.iconColor = 'rgb(255,255,255)';
        this.backgroundColor = 'rgb(255,0,0)';
      } else if (this.entity.attributes['hvac_action'] == 'cooling'){
        this.iconColor = 'rgb(255,255,255)';
        this.backgroundColor = 'rgb(0,0,255)';
      } else {
        this.backgroundColor = 'transparent';
      }
    } else {
      this.active = false;
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
