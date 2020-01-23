import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SensorTileComponent } from './sensor-tile.component';

describe('SensorTileComponent', () => {
  let component: SensorTileComponent;
  let fixture: ComponentFixture<SensorTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorTileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
