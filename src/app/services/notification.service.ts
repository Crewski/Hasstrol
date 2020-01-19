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
    console.log("Intitializing Notifications");
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
    this._push.createChannel({
        id: "hasstrol",
        description: "Hasstrol notification channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
       }).then(() => console.log('Channel created'));
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
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
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
