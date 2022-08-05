import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaderboardDialogComponent } from './create-leaderboard-dialog.component';

describe('CreateLeaderboardDialogComponent', () => {
  let component: CreateLeaderboardDialogComponent;
  let fixture: ComponentFixture<CreateLeaderboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLeaderboardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeaderboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
