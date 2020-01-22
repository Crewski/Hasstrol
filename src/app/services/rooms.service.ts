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
     this.roomIndex.next(index);
   }
}
