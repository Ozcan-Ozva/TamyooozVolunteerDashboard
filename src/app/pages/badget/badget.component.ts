import { Badge } from './../../model/badge';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BadgeGateway } from '../../services/gateways/badge.service';
import { BadgeDialogData, CreateBadgeComponent } from './components/create-badge/create-badge.component';
import { BadgeLeaderboardComponent } from './components/badge-leaderboard/badge-leaderboard.component';

@Component({
  selector: "app-badget",
  templateUrl: "./badget.component.html",
  styleUrls: ["./badget.component.scss"],
})
export class BadgetComponent implements OnInit {
  public badges: Badge[];
  public loader: boolean = true;
  public fackeList: number[] = [
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
  ];

  constructor(public _badgeGateway: BadgeGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchBadge({})
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.badges = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchBadge(filter: any) {
    return this._badgeGateway.getBadges({});
  }

  /* deleteJoinRequest(joinRequestId: number) {
    this._joinRequestGateway.deleteJoinRequest(joinRequestId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let deletedJoinRequest = this.joinRequests.find((joinRequest) => joinRequest.id == joinRequestId);
        this.joinRequests.splice(this.joinRequests.indexOf(deletedJoinRequest), 1);
      }
    });
  } */

  updateJoinRequest(badge: Badge) {
    const dialogRef = this.dialog.open(CreateBadgeComponent, {
      data: {
        name: badge.name,
        description: badge.description,
        metric_queries: badge.badge_condition,
      },
    });
    dialogRef.afterClosed().subscribe((badgeUpdated: BadgeDialogData) => {
      console.log("this is result");
      console.log(badgeUpdated);
    });
  }

  badgeOwners(badge: Badge) {
    const dialogRef = this.dialog.open(BadgeLeaderboardComponent, {
      data: {
        name: badge.name,
        description: "",
        metric_queries: [],
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBadgeComponent, {
      data: {
        name: "",
        description: "",
        metric_queries: [],
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        console.log(result);
        this._badgeGateway
          .postBadge({
            name: result.name,
            description: result.description,
            metric_queries: result.metric_queries,
          })
          .subscribe((result: any) => {
            if (result.status_code === 200) {
              this.badges.push(Badge.fromDTO(result.data));
            }
          });
      }
    });
  }
}
