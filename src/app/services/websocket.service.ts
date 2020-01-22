import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EntityData } from '../models/entity_data';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  myWebSocket: WebSocketSubject<any>;
  private isConnected: BehaviorSubject<boolean>;
  private messageID: number = 1;

  allEntities: EntityData[] = [];
  private entityObservalbe: BehaviorSubject<EntityData[]>;

  constructor(private _storage: StorageService) {
    this.isConnected = new BehaviorSubject<boolean>(false);
    this.entityObservalbe = new BehaviorSubject<EntityData[]>([]);

    this.connectionStatus().subscribe(value => {
      if (value) {
        this.receiveStates();
        this.receivedStateChanges();
      }
    })
  }

  public initialConnection() {
    this._storage.getMainURL().then(url => {
      this.myWebSocket = webSocket(url.replace('http', 'ws') + '/api/websocket');
      this.myWebSocket.subscribe(message => {
        // this.handleMessage(message);
        switch (message.type) {
          case "auth_required":
            this._storage.getLongLived().then(longlived => {
              if (longlived) {
                console.log("Auth with Long Lived");
                var msg = { type: "auth", access_token: longlived };
                this.myWebSocket.next(msg);
              } else {
                this._storage.getToken().then(token => {
                  console.log("Auth with token");
                  var msg = { type: "auth", access_token: token };
                  this.myWebSocket.next(msg);
                })
              }
            })
            break;
          case "auth_ok":
            this.isConnected.next(true);
            this._storage.getLongLived().then(longlived => {
              if (!longlived) {
                this.receiveLongLivedToken().then(data => {
                  console.log(data);
                })
              }
            })
            break;
          case "auth_invalid":
            console.log(message);
            this._storage.setLongLived(null);
            this._storage.setToken(null);
            break;
        }
      })
    })
  }

  private receiveLongLivedToken(): Promise<boolean> {
    let id = this.messageID;
    this.messageID++;
    let msg = { id: id, type: "auth/long_lived_access_token", client_name: 'Hasstrol_' + Math.floor(Math.random() * 99999 + 1), client_icon: '', lifespan: 365 };
    this.myWebSocket.next(msg);    
    return new Promise((resolve) => {
      this.myWebSocket.subscribe(data => {
        if (data.id == id) {          
          this._storage.setLongLived(data.result);
          resolve(true);
        }
      })
    })
  }


  getEntityData(): Observable<EntityData[]> {
    return this.entityObservalbe.asObservable();
  }

  receiveStates(): Promise<boolean> {
    let id = this.messageID;
    this.messageID++;
    let msg = { id: id, type: 'get_states' };
    this.myWebSocket.next(msg);
    return new Promise((resolve) => {
      this.myWebSocket.subscribe(message => {
        if (message.id == id) {
          if (message.success && message.result && message.result.length > 1) {
            this.allEntities = message.result;
            this.entityObservalbe.next(this.allEntities);
            resolve(true);
          }
        }
      })
    })

  }

  receivedStateChanges() {
    const id = this.messageID;
    let msg = { type: 'subscribe_events', event_type: 'state_changed', id: id };
    this.messageID++;
    this.myWebSocket.next(msg);
    this.myWebSocket.subscribe(message => {
      if (message.id == id && message.type == "event") {
        // console.log(message);
        try {
          let index = this.allEntities.findIndex(entity => entity.entity_id == message.event.data.new_state.entity_id);
          if (message.event.data.new_state) {
            this.allEntities[index] = message.event.data.new_state;
          }
        } catch (err) {
          console.log(message);
          console.log(err);
        }
        this.entityObservalbe.next(this.allEntities);
      }
    })
  }



  sendMessage(message: any, id?: number) {
    if (message.type != 'auth') {
      message['id'] = id ? id : this.messageID;
      this.messageID++;
      console.log(message);
    }
    this.myWebSocket.next(message);
  }

  callService(domain: string, service: string, entity_id: string): Promise<any> {
    let id = this.messageID;
    this.messageID++;
    let msg = { id: id, type: 'call_service', domain: domain, service: service, service_data: { entity_id: entity_id } };
    this.myWebSocket.next(msg);
    return new Promise((resolve, reject) => {
      this.myWebSocket.subscribe(data => {
        if (data.id == id) {
          resolve(data);
        }
      })
    })
  }

  getThumbnail(type: string, entity_id: string) {
    if (type === 'camera' || type === 'media_player') {
      let msg = { type: type + '_thumbnail', entity_id: entity_id };
      this.sendMessage(msg);
    }
  }

  getCameraStream(entity_id: string) {
    let msg = { type: "camera/stream", entity_id: entity_id };
    this.sendMessage(msg);
  }

  connectionStatus(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  getEntityList(){
    return this.allEntities;
  }






}


