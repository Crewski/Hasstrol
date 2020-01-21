import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  MAIN_URL = "mainurl";
  TOKEN = "token";
  LONG_LIVED = "longlived"

  public savedRooms = [
    { name: "1st Floor", entities: ["light.front_door", "light.back_door", "light.kitchen_table", "light.kitchen_island", "light.under_cabinet"] },
    { name: "Another Room", entities: ["light.garage_entrance", "sensor.washing_machine_current"] },
    { name: "Third Room", entities: ["light.porch_light", "sensor.washing_machine_current"] }
  ]

  constructor(private _storage: Storage) {
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
}
