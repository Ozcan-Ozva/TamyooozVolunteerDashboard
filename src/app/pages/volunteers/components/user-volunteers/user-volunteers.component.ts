import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { User } from '../../../../model/user';
import { UserGateway } from '../../../../services/gateways/user.service';

@Component({
  selector: "app-user-volunteers",
  templateUrl: "./user-volunteers.component.html",
  styleUrls: ["./user-volunteers.component.scss"],
})
export class UserVolunteersComponent implements OnInit {
  public users: User[];
  public isUserActive = true;

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


  constructor(public _userGateway: UserGateway, public dialog: MatDialog, public router : Router) {}

  ngOnInit() {
    this.getUsers({
      status: Number(this.isUserActive),
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
          this.getUsers({
            status: Number(this.isUserActive),
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchUsers(filter: VolunteerFilter) {
    this.loader = true;
    return this._userGateway.getUsers(filter);
  }

  volunteerProfilePage(id: number) {
    console.log("this is id");
    console.log(id);
    let volunteerData = {
      id: id,
      type : 'User'
    }
    /* this.router.navigate(['/user-profile', volunteerData]); */
    this.router.navigateByUrl('/user-profile', { state: volunteerData });
  }

  private getUsers(filter: VolunteerFilter) {
    this.fetchUsers(filter)
      .then((data) => {
        this.users = data.users;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.loader = false;
        this.lastPage = data.last_page;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  checkActiveUserStatus($event) {
    console.log($event.target.checked);
    this.getUsers({
      status: Number($event.target.checked),
      per_page: this.per_page,
      page: 1,
    });
  }

  changeTableIndex(index: number) {
    this.current_page = index;
    this.getUsers({
      status: Number(this.isUserActive),
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
      this.getUsers({
        status: Number(this.isUserActive),
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

