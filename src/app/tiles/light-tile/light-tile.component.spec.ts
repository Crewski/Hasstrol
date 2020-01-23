import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LightTileComponent } from './light-tile.component';

describe('LightTileComponent', () => {
  let component: LightTileComponent;
  let fixture: ComponentFixture<LightTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightTileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LightTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
