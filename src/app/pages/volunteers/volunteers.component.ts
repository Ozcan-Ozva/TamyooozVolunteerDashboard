import { User } from "./../../model/user";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserGateway } from "../../services/gateways/user.service";
import { AdminGateway } from "../../services/gateways/admin.service";
import { Admin } from "../../model/admin";
import { debounceTime, delay, of, Subject, Subscription, switchMap } from "rxjs";

@Component({
  selector: "app-volunteers",
  templateUrl: "./volunteers.component.html",
  styleUrls: ["./volunteers.component.scss"],
})
export class VolunteersComponent implements OnInit {
  public users: User[];
  public admins: Admin[];
  public isUserActive = true;
  public isAdminActive = true;
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
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
    public _userGateway: UserGateway,
    public _adminGateway: AdminGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    document.getElementById("defaultOpen").click();
  }

  /* ngAfterViewInit() {
    this.inputSub = this.valueChanged
      .pipe(
        debounceTime(1000),
      )
      .subscribe(value => {
        this.per_page = value;
        console.log(value);
        if (this.per_page !== null && this.per_page !== 0) {
          this.getUsers({
            status: Number(this.isUserActive),
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  } */
/* 
  ngOnDestroy() {
    this.inputSub.unsubscribe();
  } */

  /* private async fetchUsers(filter: VolunteerFilter) {
    this.loader = true;
    return this._userGateway.getUsers(filter);
  } */

  private async fetchAdmins(filter: any) {
    this.loader = true;
    return this._adminGateway.getAdmins(filter);
  }

  /* private getUsers(filter: VolunteerFilter) {
    this.fetchUsers(filter)
      .then((data) => {
        this.users = data.users;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  } */

  /* private getAdmins(filter: VolunteerFilter) {
    this.fetchAdmins(filter)
      .then((data) => {
        this.admins = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  } */
/* 
  checkActiveUserStatus($event) {
    console.log($event.target.checked);
    this.getUsers({
      status: Number($event.target.checked),
      per_page: this.per_page,
      page: 1,
    });
  } */

  /* checkActiveAdminStatus($event) {
    console.log($event.target.checked);
    this.getAdmins({
      status: Number($event.target.checked),
      per_page: this.per_page,
      page: 1,
    });
  } */

  /* changeTableIndex(index: number) {
    this.current_page = index;
    this.getUsers({
      status: Number(this.isUserActive),
      per_page: this.per_page,
      page: this.current_page,
    });
  } */

  changePerPage() {
    this.valueChanged.next(this.per_page);
  }

  openCity(evt, volunteerType) {
    if (volunteerType === "Admins") {
      /* this.getAdmins({
        status: Number(this.isAdminActive),
        per_page: 2,
        page: 1,
      }); */
    } else if (volunteerType === "Users") {
      /* this.getUsers({
        status: Number(this.isUserActive),
        per_page: 2,
        page: 1,
      }); */
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(volunteerType).style.display = "block";
    evt.currentTarget.className += " active";
  }

  getClassName(index: number) {
    if (this.current_page == index) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }

  /* deleteJoinRequest(joinRequestId: number) {
    this._joinRequestGateway
      .deleteJoinRequest(joinRequestId)
      .subscribe((result: any) => {
        if (result.status_code === 200) {
          let deletedJoinRequest = this.joinRequests.find(
            (joinRequest) => joinRequest.id == joinRequestId
          );
          this.joinRequests.splice(
            this.joinRequests.indexOf(deletedJoinRequest),
            1
          );
        }
      });
  } */

  /* updateJoinRequest(editJoinRequest: JoinRequest) {
    let pipe = new DatePipe("en-US");
    const dialogRef = this.dialog.open(CreateJoinRequestComponent, {
      data: {
        name: editJoinRequest.user.name,
        username: "hassaMnsew",
        email: editJoinRequest.user.email,
        date_of_birth: editJoinRequest.user.date_of_birth,
        phone: editJoinRequest.user.phone,
        gender: 1,
        location: editJoinRequest.user.location,
        job: editJoinRequest.user.job,
        volunteering_history: editJoinRequest.user.volunteering_history,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((joinRequestUpdated: JoinRequestDialogData) => {
        console.log("this is roleResult");
        console.log(joinRequestUpdated);
        let formattedDate = pipe.transform(
          joinRequestUpdated.date_of_birth,
          "dd/MM/yyyy"
        );
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
                this.joinRequests.indexOf(
                  this.joinRequests.find(
                    (joinRequest) => joinRequest.id === editJoinRequest.id
                  )
                ),
                1
              );
              this.joinRequests.push(JoinRequest.fromDTO(result.data));
            }
          });
      });
  } */

  /* openDialog(): void {
    let pipe = new DatePipe("en-US");
    const dialogRef = this.dialog.open(CreateJoinRequestComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: JoinRequestDialogData) => {
      if (result !== undefined) {
        let formattedDate = pipe.transform(result.date_of_birth, "yyyy-MM-dd");
        this._joinRequestGateway
          .postJoinRequest({
            name: result.name,
            username: "hassaMnsew",
            email: result.email,
            date_of_birth: formattedDate,
            phone: result.phone,
            gender: result.gender,
            location: result.location,
            job: result.job,
            volunteering_history: result.volunteering_history,
          })
          .subscribe((result: any) => {
            if (result.status_code === 200) {
              this.joinRequests.push(JoinRequest.fromDTO(result.data));
            }
          });
      }
    });
  } */
}

export interface VolunteerFilter {
  status?: number;
  per_page?: number;
  page?: number;
}
