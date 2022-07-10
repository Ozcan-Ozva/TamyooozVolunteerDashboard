import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesBoxComponent } from './badges-box.component';

describe('BadgesBoxComponent', () => {
  let component: BadgesBoxComponent;
  let fixture: ComponentFixture<BadgesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
