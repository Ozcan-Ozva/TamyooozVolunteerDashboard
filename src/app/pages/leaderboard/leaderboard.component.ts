import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Leaderboard } from '../../model/leaderboard';
import { LeaderboardGateway } from '../../services/gateways/leaderboard.service';
import { CreateLeaderboardDialogComponent, LeaderboardDialogData } from './components/create-leaderboard-dialog/create-leaderboard-dialog.component';
import { LeaderboardVolunteersDialogComponent } from './components/leaderboard-volunteers-dialog/leaderboard-volunteers-dialog.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  public loader: boolean = true;
  public leaderboards : Leaderboard[];
  /* These attributes is sharable */
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
  public lastPage: number = 0;
  public from = 1;
  /* End sharable attributes */
  

  constructor(public _leaderboardGateway: LeaderboardGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.getLeaderboards({
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
          this.getLeaderboards({
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchLeaderboards(filter: any) {
    return this._leaderboardGateway.getLeaderboards({});
  }

  leaderboardVolunteers(leaderboard: Leaderboard) {
    const dialogRef = this.dialog.open(LeaderboardVolunteersDialogComponent, {
      data: {
        users : leaderboard.volunteers
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
      }
    });
  }

  private getLeaderboards(filter : any) {
    this.fetchLeaderboards(filter)
      .then((data) => {
        this.loader = false;
        this.leaderboards = data.leaderboards;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateLeaderboardDialogComponent, {
      data: {
        name: "",
        description: "",
        metric_queries: [],
      },
    });
    dialogRef.afterClosed().subscribe((result: LeaderboardDialogData) => {
      if (result !== undefined) {
        console.log(result);
        this._leaderboardGateway
          .postLeaderboard(result)
          .subscribe((result: any) => {
            if (result) {
              this.leaderboards.push(Leaderboard.fromDTO(result));
            }
          });
      }
    });
  }

  
  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getLeaderboards({
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
      this.getLeaderboards({
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
