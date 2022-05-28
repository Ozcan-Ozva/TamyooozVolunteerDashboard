import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgetComponent } from './badget.component';

describe('BadgetComponent', () => {
  let component: BadgetComponent;
  let fixture: ComponentFixture<BadgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
