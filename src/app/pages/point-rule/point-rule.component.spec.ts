import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointRuleComponent } from './point-rule.component';

describe('PointRuleComponent', () => {
  let component: PointRuleComponent;
  let fixture: ComponentFixture<PointRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
