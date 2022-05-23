import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrgRequestComponent } from './join-org-request.component';

describe('JoinOrgRequestComponent', () => {
  let component: JoinOrgRequestComponent;
  let fixture: ComponentFixture<JoinOrgRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinOrgRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOrgRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
