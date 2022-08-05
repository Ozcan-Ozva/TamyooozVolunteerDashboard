import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-leaderboard-volunteers-dialog',
  templateUrl: './leaderboard-volunteers-dialog.component.html',
  styleUrls: ['./leaderboard-volunteers-dialog.component.scss']
})
export class LeaderboardVolunteersDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<LeaderboardVolunteersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
