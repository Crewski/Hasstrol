import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { RoomComponent } from '../room/room.component';

import { EntityTileComponent } from '../entity-tile/entity-tile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),    
  ],
  declarations: [HomePage, 
    EntityTileComponent,
    RoomComponent
  ]
})
export class HomePageModule {}
