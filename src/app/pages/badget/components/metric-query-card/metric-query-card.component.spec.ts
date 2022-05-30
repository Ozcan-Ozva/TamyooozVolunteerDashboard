import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricQueryCardComponent } from './metric-query-card.component';

describe('MetricQueryCardComponent', () => {
  let component: MetricQueryCardComponent;
  let fixture: ComponentFixture<MetricQueryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricQueryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricQueryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
