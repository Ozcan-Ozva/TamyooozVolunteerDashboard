import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJoinRequestComponent } from './create-join-request.component';

describe('CreateJoinRequestComponent', () => {
  let component: CreateJoinRequestComponent;
  let fixture: ComponentFixture<CreateJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
