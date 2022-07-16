import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Level } from '../../model/level';
import { LevelGateway } from '../../services/gateways/level.service';
import { CreateLevelDialogComponent } from './components/create-level-dialog/create-level-dialog.component';
import { ObtainLevelComponent } from './components/obtain-level/obtain-level.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  public levels : Level[];
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

  constructor(public dialog: MatDialog, public _levelGateway : LevelGateway) { }

  ngOnInit(): void {
    this.getLevels({
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
          this.getLevels({
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchLevels(filter: any) {
    this.loader = true;
    return this._levelGateway.getLevels(filter);
  }

  private getLevels(filter : LevelFilter) {
    this.fetchLevels(filter)
      .then((data) => {
        this.loader = false;
        this.levels = data.levels;
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
    const dialogRef = this.dialog.open(CreateLevelDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this._levelGateway.postLevel(result)
        .subscribe((data) => {
          console.log("this is data");
          console.log(data);
          this.levels.push(result);
        }) 
      }
    });
  }

  deleteLevel(levelId: number) {
    /* this._categoryGateway.deleteCategory(categoryId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let deletedCategory = this.categories.find((category) => category.id == categoryId);
        this.categories.splice(this.categories.indexOf(deletedCategory), 1);
      }
    }); */
    let deletedLevel = this.levels.find((level) => level.id == levelId);
    this.levels.splice(this.levels.indexOf(deletedLevel), 1);
  }

  badgeOwners(level : Level) {
    const dialogRef = this.dialog.open(ObtainLevelComponent, {
      data: {
        id: level.id
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
      }
    });
  }

  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getLevels({
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
      this.getLevels({
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

export interface LevelFilter {
  per_page?: number;
  page?: number;
}