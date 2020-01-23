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

import { VgCoreModule } from '../../../node_modules/videogular2/compiled/core';
import { VgControlsModule } from '../../../node_modules/videogular2/compiled/controls';
import { VgOverlayPlayModule } from '../../../node_modules/videogular2/compiled/overlay-play';
import { VgBufferingModule } from '../../../node_modules/videogular2/compiled/buffering';
import { LightTileComponent } from '../tiles/light-tile/light-tile.component';
import { SensorTileComponent } from '../tiles/sensor-tile/sensor-tile.component';
import { CoverTileComponent } from '../tiles/cover-tile/cover-tile.component';
import { ClimateTileComponent } from '../tiles/climate-tile/climate-tile.component';


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
    IonicSelectableModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [HomePage, 
    EntityTileComponent,
    CameraTileComponent,
    RoomComponent,
    CameraModalComponent,
    LightTileComponent,
    SensorTileComponent,
    CoverTileComponent,
    ClimateTileComponent
  ],
  entryComponents: [CameraModalComponent,
    LightTileComponent, 
    SensorTileComponent, 
    CoverTileComponent,
    ClimateTileComponent
  ]
})
export class HomePageModule {}
