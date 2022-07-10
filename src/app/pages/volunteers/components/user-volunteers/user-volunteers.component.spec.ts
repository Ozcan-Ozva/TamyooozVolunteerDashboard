import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVolunteersComponent } from './user-volunteers.component';

describe('UserVolunteersComponent', () => {
  let component: UserVolunteersComponent;
  let fixture: ComponentFixture<UserVolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVolunteersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
