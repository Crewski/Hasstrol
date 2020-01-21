import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private roomIndex: BehaviorSubject<number>

  constructor() {
    this.roomIndex = new BehaviorSubject<number>(null);
   }

   getRoomIndex(){
     return this.roomIndex.asObservable();
   }

   setRoomIndex(index: number){
     console.log("Room Index = " + index);
     this.roomIndex.next(index + 1);
   }
}
