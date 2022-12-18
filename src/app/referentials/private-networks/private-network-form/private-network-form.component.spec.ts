import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPlotFormComponent } from './land-plot-form.component';

describe('LandPlotFormComponent', () => {
  let component: LandPlotFormComponent;
  let fixture: ComponentFixture<LandPlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPlotFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandPlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
