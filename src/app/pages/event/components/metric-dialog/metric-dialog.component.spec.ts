import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDialogComponent } from './metric-dialog.component';

describe('MetricDialogComponent', () => {
  let component: MetricDialogComponent;
  let fixture: ComponentFixture<MetricDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
