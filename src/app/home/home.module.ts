import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { RoomComponent } from '../room/room.component';

import { EntityTileComponent } from '../entity-tile/entity-tile.component';
import { DragulaModule } from 'ng2-dragula';


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
    DragulaModule   
  ],
  declarations: [HomePage, 
    EntityTileComponent,
    RoomComponent
  ]
})
export class HomePageModule {}
