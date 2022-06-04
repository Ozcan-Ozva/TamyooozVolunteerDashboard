import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PointRule } from '../../model/point-rule';
import { PointRuleGateway } from '../../services/gateways/point-rule.service';
import { CreatePointRoleComponent, PointRoleDialogData } from './components/create-point-role/create-point-role.component';

@Component({
  selector: 'app-point-rule',
  templateUrl: './point-rule.component.html',
  styleUrls: ['./point-rule.component.scss']
})
export class PointRuleComponent implements OnInit {

  public pointRules: PointRule[];
  public loader: boolean = true;

  constructor(
    public _pointRuleGateway: PointRuleGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchPointRule({})
      .then((data) => {
        this.pointRules = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchPointRule(filter: any) {
    this.loader = true;
    return this._pointRuleGateway.getPointRule({});
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
    const dialogRef = this.dialog.open(CreatePointRoleComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: PointRoleDialogData) => {
      if (result !== undefined) {
        console.log("this is result");
        console.log(result);
        this._pointRuleGateway
        .postPointRule({
            rule_name: result.rule_name,
            description: result.description,
            points: result.points,
            metric_queries: {
              metric_id: result.metric_queries.metric_id,
              first_operation: result.metric_queries.first_operation,
            }
        })
        .subscribe((resultApi: any) => {
          if (resultApi !== null) {
            this.pointRules.push(PointRule.fromDTO(resultApi));
          }
        });
      }
    });
  }
}
