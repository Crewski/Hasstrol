import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  MAIN_URL = "mainurl";
  LONG_LIVED_TOKEN = "token";

  public savedView = [
    { name: "1st Floor", entities: ["light.front_door", "light.back_door", "light.kitchen_table", "light.kitchen_island", "light.under_cabinet"]},
    { name: "Another Room", entities: ["light.garage_entrance", "sensor.washing_machine_current"]}
  ]

  constructor(private _storage: Storage) {
   }

   setMainURL(mainurl: string){
     this._storage.set(this.MAIN_URL, mainurl);
   }

   getMainURL(): Promise<string>{
     return new Promise((resolve, reject) => {
    this._storage.get(this.MAIN_URL).then(data => {
      resolve(data);
     }).catch(err => {
       reject(err);
     })
    })
   }
}
