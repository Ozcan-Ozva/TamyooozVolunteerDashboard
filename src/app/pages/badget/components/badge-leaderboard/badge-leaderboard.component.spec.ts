import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeLeaderboardComponent } from './badge-leaderboard.component';

describe('BadgeLeaderboardComponent', () => {
  let component: BadgeLeaderboardComponent;
  let fixture: ComponentFixture<BadgeLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
