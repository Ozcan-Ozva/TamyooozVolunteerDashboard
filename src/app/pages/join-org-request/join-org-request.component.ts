import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { debounceTime, Subject, Subscription } from "rxjs";
import { JoinRequest } from "../../model/join-request";
import { JOIN_REQUEST_STATUS } from "../../model/join-request";
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
  /* These attributes is sharable */
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
  public loader: boolean = true;
  public lastPage: number = 0;
  public from = 1;
  /* End sharable attributes */

  constructor(
    public _joinRequestGateway: JoinRequestGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getJoinRequests({
      per_page: this.per_page,
      page: 1,
    });
  }

  ngAfterViewInit() {
    this.inputSub = this.valueChanged
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.per_page = value;
        console.log(value);
        if (this.per_page !== null && this.per_page !== 0) {
          this.getJoinRequests({
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchJoinRequest(filter: any) {
    this.loader = true;
    return this._joinRequestGateway.getJoinRequest(filter);
  }

  private getJoinRequests(filter : JoinRequestsFilter) {
    this.fetchJoinRequest(filter)
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.loader = false;
        this.joinRequests = data.joinRequests;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.lastPage = data.last_page;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
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
    this._joinRequestGateway
      .acceptJoinRequest(joinRequestId)
      .subscribe((result: any) => {
        if (result.status_code === 200) {
          console.log("this is worked");
          let joinRequest = this.joinRequests.find(
            (jR) => jR.id == joinRequestId
          );
          this.joinRequests[this.joinRequests.indexOf(joinRequest)].status =
            this.checkJoinRequestStatus(2);
        }
      });
  }

  acceptUserJoinRequest(userId: number) {
    this._joinRequestGateway
      .acceptUserJoinRequest(userId)
      .subscribe((result: any) => {
        if (result.status_code === 200) {
          console.log("this is worked");
          let joinRequest = this.joinRequests.find(
            (jR) => jR.user.id == userId
          );
          console.log("this is join request");
          console.log(joinRequest);
          this.joinRequests[this.joinRequests.indexOf(joinRequest)].status =
            this.checkJoinRequestStatus(3);
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
            this.total++;
          }
        });
      }
    });
  }

  checkJoinRequestStatus(state: number) : JOIN_REQUEST_STATUS {
    if (state == 1) {
      return JOIN_REQUEST_STATUS.WAITING_FOR_HRM;
    }
    else if (state == 2) {
      return JOIN_REQUEST_STATUS.WAITING_FOR_HR_OFFICER;
    }
    else if (state == 3) {
      return JOIN_REQUEST_STATUS.ACCEPTED;
    }
    else if (state == 4) {
      return JOIN_REQUEST_STATUS.DECLINED;
    }
  }

  checkNumberOfJoinRequestStatus(state: JOIN_REQUEST_STATUS) : number {
    if (state == JOIN_REQUEST_STATUS.WAITING_FOR_HRM) {
      return 1;
    }
    else if (state == JOIN_REQUEST_STATUS.WAITING_FOR_HR_OFFICER) {
      return 2;
    }
    else if (state == JOIN_REQUEST_STATUS.ACCEPTED) {
      return 3;
    }
    else if (state == JOIN_REQUEST_STATUS.DECLINED) {
      return 4;
    }
  }

  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getJoinRequests({
      per_page: this.per_page,
      page: this.current_page,
    });
  }

  checkHidden(index) {
    if (index - this.current_page <= 2 && index - this.current_page >= -2) {
      return "visible";
    }
    else {
      return "hidden";
    }
  }

  checkFirstIndex() {
    if (this.current_page - 1 > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  checkLastIndex() {
    if (this.lastPage - this.current_page > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  nextPage(next: boolean) {
    if (
      (this.current_page != this.lastPage && next) ||
      (this.current_page != this.from && !next)
    ) {
      if (next) this.current_page++;
      else this.current_page--;
      this.getJoinRequests({
        per_page: this.per_page,
        page: this.current_page,
      });
    }
  }

  checkPreviousClass() {
    if (this.from == this.current_page)
      return "disable-pagination-button";
  }

  checkNextClass() {
    if (this.lastPage == this.current_page)
      return "disable-pagination-button";
  }

  changePerPage() {
    this.valueChanged.next(this.per_page);
  }

  getClassName(index: number) {
    if (this.current_page == index) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }
  /* End Method */
}

export interface JoinRequestsFilter {
  per_page?: number;
  page?: number;
}
