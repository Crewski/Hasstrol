import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { StorageService } from '../services/storage.service';
import { WebsocketService } from '../services/websocket.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { EntityData } from '../models/entity_data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnChanges {

  @ViewChild('entitySelectable', {static: false}) entitySelectable: IonicSelectableComponent;

  // @Input() roomData: any;
  @Input() index: number;
  @Input() maxIndex: number;


  public entityList: EntityData[] = [];
  isEditing: boolean = false;
  roomData: any = {name: "", entities: []};

  constructor(private _dragula: DragulaService, 
              private _storage: StorageService, 
              public _ws: WebsocketService,
              private _alertCtrl: AlertController) {

    this._dragula.drop('bag')
    .subscribe(() => {
      
      this._storage.setSavedRoom(this.index, this.roomData);
      console.log(this.roomData)
    });
    this._storage.editingStatus().subscribe(res => this.isEditing = res);    
   }

  ngOnChanges () {
    this._storage.savedRooms.subscribe(rooms => {
      this.roomData = rooms[this.index];      
    });
  }

  async changeName(){
    const alert = await this._alertCtrl.create({
      header: 'Room name',
      inputs: [
        { name: 'name', type: 'text', value: this.roomData.name}
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Save',
          handler: (data => {
            this.roomData.name = data.name;
            this._storage.setSavedRoom(this.index, this.roomData);
          })
        }
      ]
    })
    await alert.present();
    
  }

  shiftRoom(toRight: boolean){
    this._storage.shiftRoom(this.index, toRight)
  }

  newRoom(){
    this._storage.addRoom();
  }

  removeRoom(){
    this._storage.removeRoom(this.index);
  }

  newEntitySelected(event: any){
    console.log(event);
    this.roomData.entities.push(event.value.entity_id);
    this._storage.setSavedRoom(this.index, this.roomData);
  }

  openEntitySelectable(){
    this.entityList = [...this._ws.allEntities];
    this.entitySelectable.clear();
    this.entitySelectable.open();
  }

  filterEntities(text: string) {
    
    return this.entityList.filter(entity => {
      try{

      return entity.entity_id.toLowerCase().indexOf(text) !== -1 ||
      entity.attributes['friendly_name'].toLowerCase().indexOf(text) !== -1
      } catch (err) {
        return entity.entity_id.toLowerCase().indexOf(text) !== -1
      }
    });
  }

  searchEntities(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    

    if (!text) {
      event.component.items = [];
      event.component.endSearch();
      return;
    }

    
      event.component.items = this.filterEntities(text);
      event.component.endSearch();
    
  }
  
  stopEditing(){
    this._storage.setEditing(false);
  }

}
