import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  @Input() roomData: any;
  @Input() index: number;

  constructor(private _dragula: DragulaService, private _storage: StorageService) {
    this._dragula.drop('bag')
    .subscribe(() => {
      this._storage.setSavedRoom(this.index, this.roomData);
      console.log(this.roomData)
    });
   }

  ngOnInit() {}

}
