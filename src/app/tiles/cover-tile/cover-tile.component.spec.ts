import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoverTileComponent } from './cover-tile.component';

describe('CoverTileComponent', () => {
  let component: CoverTileComponent;
  let fixture: ComponentFixture<CoverTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverTileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoverTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
