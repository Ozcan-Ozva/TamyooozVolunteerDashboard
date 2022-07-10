import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetricComponent } from './create-metric.component';

describe('CreateMetricComponent', () => {
  let component: CreateMetricComponent;
  let fixture: ComponentFixture<CreateMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMetricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
