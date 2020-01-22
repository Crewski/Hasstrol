import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  MAIN_URL = "mainurl";
  TOKEN = "token";
  LONG_LIVED = "longlived";
  SAVED_ROOMS = "savedrooms";

  
  private isEditing: BehaviorSubject<boolean>;

  public savedRooms = [];

  constructor(private _storage: Storage) {
    this._storage.get(this.SAVED_ROOMS).then(rooms => this.savedRooms = rooms);
    this.isEditing = new BehaviorSubject<boolean>(false);
  }

  editingStatus(): Observable<boolean> {
    return this.isEditing.asObservable();
  }

  setEditing(){
    this.isEditing.next(!this.isEditing.value);
  }



  setSavedRoom(index, roomData){
    
    this.savedRooms[index] = roomData;
    this._storage.set(this.SAVED_ROOMS, this.savedRooms)
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

  public deleteEntity(roomIndex: number, entityIndex: number){
    console.log("Deleting - " + this.savedRooms[roomIndex].entities[entityIndex])
    this.savedRooms[roomIndex].entities.splice(entityIndex, 1);
    
    this._storage.set(this.SAVED_ROOMS, this.savedRooms)
  }
}
