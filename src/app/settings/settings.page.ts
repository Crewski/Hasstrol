import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { WebsocketService } from '../services/websocket.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private _storage: StorageService,
              private _iab: InAppBrowser,
              private _ws: WebsocketService,
              private _http: HttpClient
    ) { }

  mainUrl: string;

  ngOnInit() {
    this._storage.getMainURL().then(data => {
      this.mainUrl = data;
    })
  }

  saveLLT(llt: string){
    this._storage.setLongLived(llt).then(() => this._ws.initialConnection())
  }

  connect(){
    this._storage.setToken(null);
    this._storage.setLongLived(null);
    this._storage.setMainURL(this.mainUrl).then(res => {
      if (res){
        let authUrl = this.mainUrl + "/auth/authorize?client_id=" + this.mainUrl + '/hasstrol&redirect_uri=' + this.mainUrl + '/hasstrol';
        const browser = this._iab.create(authUrl);
        browser.show();
        browser.on('loadstart').subscribe(data => {
          let urldata = data.url.split('?code=');
          if(urldata[0] == this.mainUrl + '/hasstrol'){
            browser.close();
            var headers = new HttpHeaders();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            const body = new HttpParams()
              .set('grant_type', 'authorization_code')
              .set('client_id', this.mainUrl + '/hasstrol')
              .set('code', urldata[1]);
            this._http.post(this.mainUrl + '/auth/token', body, {headers: headers}).subscribe(res => {
              console.log(res);
            this._storage.setToken(res['access_token']).then(() => {
              this._ws.initialConnection();
            })
            })
          }
        })

      }
    })
  }



}
