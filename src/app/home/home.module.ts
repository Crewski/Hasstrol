import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { RoomComponent } from '../room/room.component';

import { EntityTileComponent } from '../entity-tile/entity-tile.component';
import { DragulaModule } from 'ng2-dragula';
import { IonicSelectableModule } from 'ionic-selectable';
import { CameraTileComponent } from '../tiles/camera-tile/camera-tile.component';
import { CameraModalComponent } from '../modals/camera-modal/camera-modal.component';


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
    DragulaModule,
    IonicSelectableModule  
  ],
  declarations: [HomePage, 
    EntityTileComponent,
    CameraTileComponent,
    RoomComponent,
    CameraModalComponent
  ],
  entryComponents: [CameraModalComponent]
})
export class HomePageModule {}
