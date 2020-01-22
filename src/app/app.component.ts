import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebsocketService } from './services/websocket.service';
import { NotificationService } from './services/notification.service';
import { StorageService } from './services/storage.service';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _ws: WebsocketService,
    private _notification: NotificationService,
    public _storage: StorageService,
    private _roomsService: RoomsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._ws.initialConnection();
      this._notification.initNotifications();
    });
  }

  setRoomIndex(index: number){
    this._roomsService.setRoomIndex(index);
    this._storage.setEditing
  }
}
