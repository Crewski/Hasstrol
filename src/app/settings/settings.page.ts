import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private _storage: StorageService) { }

  mainUrl: string;

  ngOnInit() {
    this._storage.getMainURL().then(data => {
      this.mainUrl = data;
    })
  }

  connect(){
    this._storage.setMainURL(this.mainUrl);
  }



}
