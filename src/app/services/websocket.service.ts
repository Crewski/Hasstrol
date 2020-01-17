import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EntityData } from '../models/entity_data';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  myWebSocket: WebSocketSubject<any> = webSocket('wss://HAINSTNACE.duckdns.org:8123/api/websocket');
  access_token = 'token'
  private isConnected: BehaviorSubject<boolean>;
  private messageID: number = 1;

  allEntities: EntityData[] = [];
  private entityObservalbe: BehaviorSubject<EntityData[]>;

  constructor() {
    this.isConnected = new BehaviorSubject<boolean>(false);
    this.entityObservalbe = new BehaviorSubject<EntityData[]>([]);

    this.connectionStatus().subscribe(value => {
      if (value) {
        let msg = { type: 'get_states' };
        this.sendMessage(msg);
        let msgEvents = { type: 'subscribe_events', event_type: 'state_changed' };
        this.sendMessage(msgEvents);
      }
    })
  }

  public initialConnection(){
    this.myWebSocket.subscribe(message => {
      // console.log(message);
      this.handleMessage(message);
    })
  }

  private handleMessage(message) {
    console.log(message);
    switch (message.type) {
      case "auth_required":
        var msg = { type: "auth", access_token: this.access_token };
        this.sendMessage(msg);
        break;
      case "auth_ok":
        this.isConnected.next(true);
        break;
      case "result":
        if (message.success && message.result && message.result.length > 1) {
          this.allEntities = message.result;
          this.entityObservalbe.next(this.allEntities);
          console.log(this.allEntities);
        };
        break;
      case "event":
        if (message.event.event_type == 'state_changed') {
          // console.log(message);
          try {
            let index = this.allEntities.findIndex(entity => entity.entity_id == message.event.data.new_state.entity_id);
            if (message.event.data.new_state) {
              this.allEntities[index] = message.event.data.new_state;
            }
          } catch (err) {
            console.log(err);
          }
          this.entityObservalbe.next(this.allEntities);
          break;
        }
    }
  }

  getEntityData(): Observable<EntityData[]> {
    return this.entityObservalbe.asObservable();
  }



  sendMessage(message: any) {
    if (message.type != 'auth') {
      message['id'] = this.messageID;
      this.messageID++;
    }
    this.myWebSocket.next(message);
  }

  callService(domain: string, service: string, entity_id: string) {
    let msg = { type: 'call_service', domain: domain, service: service, service_data: { entity_id: entity_id } };
    this.sendMessage(msg);
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






}


