import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostComponent } from './admin-post.component';

describe('AdminPostComponent', () => {
  let component: AdminPostComponent;
  let fixture: ComponentFixture<AdminPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
