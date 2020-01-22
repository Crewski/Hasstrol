import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { StorageService } from '../services/storage.service';
import { WebsocketService } from '../services/websocket.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { EntityData } from '../models/entity_data';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  @ViewChild('entitySelectable', {static: false}) entitySelectable: IonicSelectableComponent;

  @Input() roomData: any;
  @Input() index: number;

  public entityList: EntityData[] = [];
  isEditing: boolean = false;
  

  constructor(private _dragula: DragulaService, private _storage: StorageService, public _ws: WebsocketService) {
    this._dragula.drop('bag')
    .subscribe(() => {
      this._storage.setSavedRoom(this.index, this.roomData);
      console.log(this.roomData)
    });
    this._storage.editingStatus().subscribe(res => this.isEditing = res);
    
   }

  ngOnInit() {}

  newEntitySelected(event: any){
    console.log(event);
    this.roomData.entities.push(event.value.entity_id);
    this._storage.setSavedRoom(this.index, this.roomData);
  }

  openEntitySelectable(){
    this.entityList = [...this._ws.allEntities];
    this.entitySelectable.open();
  }

  toggleEditing(){
    this._storage.setEditing();
  }

}
