import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPlotsComponent } from './land-plots.component';

describe('LandPlotsComponent', () => {
  let component: LandPlotsComponent;
  let fixture: ComponentFixture<LandPlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
