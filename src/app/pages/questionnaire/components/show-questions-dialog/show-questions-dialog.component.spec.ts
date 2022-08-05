import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionsDialogComponent } from './show-questions-dialog.component';

describe('ShowQuestionsDialogComponent', () => {
  let component: ShowQuestionsDialogComponent;
  let fixture: ComponentFixture<ShowQuestionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuestionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
