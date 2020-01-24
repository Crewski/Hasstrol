import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebsocketService } from './services/websocket.service';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push/ngx';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { DragulaModule } from 'ng2-dragula';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicGestureConfig } from './utils/IonicGestureConfig';

@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    DragulaModule.forRoot(),
    IonicSelectableModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WebsocketService,
    Push,
    InAppBrowser,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
