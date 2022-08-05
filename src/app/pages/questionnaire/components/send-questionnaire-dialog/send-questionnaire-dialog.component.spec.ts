import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuestionnaireDialogComponent } from './send-questionnaire-dialog.component';

describe('SendQuestionnaireDialogComponent', () => {
  let component: SendQuestionnaireDialogComponent;
  let fixture: ComponentFixture<SendQuestionnaireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendQuestionnaireDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendQuestionnaireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
