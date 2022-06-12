import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../model/user';
import { BadgeGateway } from '../../../../services/gateways/badge.service';

@Component({
  selector: 'app-badge-leaderboard',
  templateUrl: './badge-leaderboard.component.html',
  styleUrls: ['./badge-leaderboard.component.scss']
})
export class BadgeLeaderboardComponent implements OnInit {

  owners: User[];

  constructor(
    public dialogRef: MatDialogRef<BadgeLeaderboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _badgeService: BadgeGateway,
  ) {}

  ngOnInit(): void {
    this._badgeService.getBadgeUsers({},this.data.badgeId)
    .subscribe((data) => {
      console.log("this is data");
      console.log(User.fromDTOArray(data[0].users));
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
