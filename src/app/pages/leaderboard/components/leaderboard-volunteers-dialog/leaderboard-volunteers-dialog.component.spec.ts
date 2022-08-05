import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardVolunteersDialogComponent } from './leaderboard-volunteers-dialog.component';

describe('LeaderboardVolunteersDialogComponent', () => {
  let component: LeaderboardVolunteersDialogComponent;
  let fixture: ComponentFixture<LeaderboardVolunteersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardVolunteersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardVolunteersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
