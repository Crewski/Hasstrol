import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomsService } from './rooms.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  MAIN_URL = "mainurl";
  TOKEN = "token";
  LONG_LIVED = "longlived";
  SAVED_ROOMS = "savedrooms";

  private editStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isEditing = this.editStatus.asObservable();

  public roomData: BehaviorSubject<any> = new BehaviorSubject<any>([{ name: 'Default Room', entities: [] }]);
  public savedRooms = this.roomData.asObservable();

  constructor(private _storage: Storage, private _rs: RoomsService) {
    this._storage.get(this.SAVED_ROOMS).then(rooms => {
      console.log(rooms);
      if (rooms) {
        this.roomData.next(rooms);
      }
    });
    // this.isEditing = new BehaviorSubject<boolean>(false);
  }

  editingStatus(): Observable<boolean> {
    return this.editStatus.asObservable();
  }

  setEditing(editing: boolean) {
    this.editStatus.next(editing);
  }

  addRoom() {
    let rooms = this.roomData.value;
    rooms.push({ name: 'New Room', entities: [] });
    this._storage.set(this.SAVED_ROOMS, rooms).then(() => {
      this.roomData.next(rooms);
      this._rs.setRoomIndex(rooms.length + 1);
    })
  }

  removeRoom(index: number){
    let rooms = this.roomData.value;
    rooms.splice(index, 1);    
    this._storage.set(this.SAVED_ROOMS, rooms).then(() => {
      this.roomData.next(rooms);
    })
  }

  shiftRoom(index: number, toRight: boolean){    
    let rooms = this.roomData.value;
    let new_index = toRight ? index + 1 : index - 1
    let cutOut = rooms.splice(index, 1) [0];
    rooms.splice(new_index, 0, cutOut);       
    this._storage.set(this.SAVED_ROOMS, rooms).then(() => {
      this.roomData.next(rooms);
      this._rs.setRoomIndex(new_index + 1);
    })
  }

  setSavedRoom(index: number, roomData: any) {
    let rooms = this.roomData.value;
    rooms[index] = roomData;
    this._storage.set(this.SAVED_ROOMS, rooms).then(() => {
      this.roomData.next(rooms);
    })
  }

  setMainURL(mainurl: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._storage.set(this.MAIN_URL, mainurl).then(() => {
        resolve(true);
      }).catch(err => {
        reject(false);
      })
    })
  }

  getMainURL(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._storage.get(this.MAIN_URL).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  setToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._storage.set(this.TOKEN, token).then(() => {
        resolve(true);
      }).catch(err => {
        reject(false);
      })
    })
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._storage.get(this.TOKEN).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  setLongLived(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._storage.set(this.LONG_LIVED, token).then(() => {
        resolve(true);
      }).catch(err => {
        reject(false);
      })
    })
  }

  getLongLived(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._storage.get(this.LONG_LIVED).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  public deleteEntity(roomIndex: number, entityIndex: number) {
    let rooms = this.roomData.value;
    rooms[roomIndex].entities.splice(entityIndex, 1);
    this._storage.set(this.SAVED_ROOMS, rooms).then(() => {      
      this.roomData.next(rooms);
    })
  }
}
