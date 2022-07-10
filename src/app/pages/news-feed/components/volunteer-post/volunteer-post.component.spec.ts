import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerPostComponent } from './volunteer-post.component';

describe('VolunteerPostComponent', () => {
  let component: VolunteerPostComponent;
  let fixture: ComponentFixture<VolunteerPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
