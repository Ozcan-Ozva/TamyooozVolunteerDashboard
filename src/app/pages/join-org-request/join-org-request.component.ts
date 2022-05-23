import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JoinRequest } from "../../model/join-request";
import { JoinRequestGateway } from "../../services/gateways/join-request.service";
import {
  CreateJoinRequestComponent,
  JoinRequestDialogData,
} from "./components/create-join-request/create-join-request.component";

@Component({
  selector: "app-join-org-request",
  templateUrl: "./join-org-request.component.html",
  styleUrls: ["./join-org-request.component.scss"],
})
export class JoinOrgRequestComponent implements OnInit {
  public joinRequests: JoinRequest[];
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
    public _joinRequestGateway: JoinRequestGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchJoinRequest({})
      .then((data) => {
        this.joinRequests = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchJoinRequest(filter: any) {
    return this._joinRequestGateway.getJoinRequest({});
  }

  deleteJoinRequest(joinRequestId: number) {
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
  }

  openDialog(): void {
    let pipe = new DatePipe('en-US');
    const dialogRef = this.dialog.open(CreateJoinRequestComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: JoinRequestDialogData) => {
      if (result !== undefined) {
        let formattedDate = pipe.transform(result.date_of_birth, 'yyyy-MM-dd');
        this._joinRequestGateway
        .postJoinRequest({
            name: result.name,
            username :"hassaMnsew",
            email : result.email,
            date_of_birth: formattedDate,
            phone: result.phone,
            gender: result.gender,
            location: result.location,
            job : result.job,
            volunteering_history: result.volunteering_history,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.joinRequests.push(JoinRequest.fromDTO(result.data));
          }
        });
      }
    });
  }
}
