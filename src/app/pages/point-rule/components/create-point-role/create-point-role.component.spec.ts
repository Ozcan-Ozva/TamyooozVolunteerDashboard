import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePointRoleComponent } from './create-point-role.component';

describe('CreatePointRoleComponent', () => {
  let component: CreatePointRoleComponent;
  let fixture: ComponentFixture<CreatePointRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePointRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePointRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
