import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricConfigurationsComponent } from './metric-configurations.component';

describe('MetricConfigurationsComponent', () => {
  let component: MetricConfigurationsComponent;
  let fixture: ComponentFixture<MetricConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
