import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainLevelComponent } from './obtain-level.component';

describe('ObtainLevelComponent', () => {
  let component: ObtainLevelComponent;
  let fixture: ComponentFixture<ObtainLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtainLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtainLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
