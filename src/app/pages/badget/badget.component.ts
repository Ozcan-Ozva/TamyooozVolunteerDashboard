import { Badge } from './../../model/badge';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BadgeGateway } from '../../services/gateways/badge.service';
import { CreateBadgeComponent } from './components/create-badge/create-badge.component';

@Component({
  selector: 'app-badget',
  templateUrl: './badget.component.html',
  styleUrls: ['./badget.component.scss']
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

  constructor(
    public _badgeGateway: BadgeGateway,
    public dialog: MatDialog
  ) {}

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
  }

  acceptJoinRequest(joinRequestId: number) {
    this._joinRequestGateway.acceptJoinRequest(joinRequestId).subscribe((result: any) => {
      if (result.status_code === 200) {
        console.log("this is worked");
      }
    });
  }

  updateJoinRequest(editJoinRequest: JoinRequest) {
    let pipe = new DatePipe('en-US');
    const dialogRef = this.dialog.open(CreateJoinRequestComponent, {
      data: { 
        name: editJoinRequest.user.name,
        username :"hassaMnsew",
        email : editJoinRequest.user.email,
        date_of_birth: editJoinRequest.user.date_of_birth,
        phone: editJoinRequest.user.phone,
        gender: 1,
        location: editJoinRequest.user.location,
        job : editJoinRequest.user.job,
        volunteering_history: editJoinRequest.user.volunteering_history, 
      },
    });
    dialogRef.afterClosed().subscribe((joinRequestUpdated: JoinRequestDialogData) => {
      console.log("this is roleResult");
      console.log(joinRequestUpdated);
      let formattedDate = pipe.transform(joinRequestUpdated.date_of_birth, 'dd/MM/yyyy');
      this._joinRequestGateway
        .updateJoinRequest(editJoinRequest.id, {
          name: joinRequestUpdated.name,
          username: "hMssaMnsew",
          email: joinRequestUpdated.email,
          date_of_birth: joinRequestUpdated.date_of_birth,
          phone: joinRequestUpdated.phone,
          gender: joinRequestUpdated.gender,
          location: joinRequestUpdated.location,
          job: joinRequestUpdated.job,
          volunteering_history: joinRequestUpdated.volunteering_history,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.joinRequests.slice(
              this.joinRequests.indexOf(this.joinRequests.find((joinRequest) => joinRequest.id === editJoinRequest.id)),
              1
            );
            this.joinRequests.push(JoinRequest.fromDTO(result.data));
          }
        });
    });
  } */

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBadgeComponent, {
      data: {},
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
