import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerAnwserQuestionnaierComponent } from './volunteer-anwser-questionnaier.component';

describe('VolunteerAnwserQuestionnaierComponent', () => {
  let component: VolunteerAnwserQuestionnaierComponent;
  let fixture: ComponentFixture<VolunteerAnwserQuestionnaierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerAnwserQuestionnaierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerAnwserQuestionnaierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
