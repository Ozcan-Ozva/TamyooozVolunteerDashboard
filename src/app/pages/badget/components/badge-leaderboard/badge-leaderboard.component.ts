import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-badge-leaderboard',
  templateUrl: './badge-leaderboard.component.html',
  styleUrls: ['./badge-leaderboard.component.scss']
})
export class BadgeLeaderboardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BadgeLeaderboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
