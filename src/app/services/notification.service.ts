import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Platform } from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _push: Push,
    private _platform: Platform,
    private _http: HttpClient) { }


  public initNotifications() {
    if (!this._platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    this._push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this._push.init(options);
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('accept').subscribe((notification: any) => {
      var action: string;
      try {
        action = notification.additionalData.actions.find(actions => actions.callback == "accept").action;
      } catch (err) {
        action = "default";
      }
      console.log('Accepted', notification)
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      let postData = {
        type: "fire_event",
        data: {
          event_type: "hasskit.action_fired",
          event_data: {
            action: action
          }
        }
      }
      this._http.post("https://webhookurl", postData, {headers: headers}).subscribe(() => {
        console.log("Posted response");
      })
    }
    );


  }


}
