import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReportComponent } from './event-report.component';

describe('EventReportComponent', () => {
  let component: EventReportComponent;
  let fixture: ComponentFixture<EventReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
