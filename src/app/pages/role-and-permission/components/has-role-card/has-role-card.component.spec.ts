import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasRoleCardComponent } from './has-role-card.component';

describe('HasRoleCardComponent', () => {
  let component: HasRoleCardComponent;
  let fixture: ComponentFixture<HasRoleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HasRoleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HasRoleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
