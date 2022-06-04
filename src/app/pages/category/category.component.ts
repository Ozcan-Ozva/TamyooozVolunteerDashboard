import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Category } from '../../model/category';
import { CategoryGateway } from '../../services/gateways/category.service';
import { CategoryDialogData, CreateCategoryComponent } from './components/create-category/create-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: Category[];
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
    public _categoryGateway: CategoryGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCategories({
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
          this.getCategories({
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchCategory(filter: any) {
    this.loader = true;
    return this._categoryGateway.getCategory(filter);
  }


  private getCategories(filter : CategoryFilter) {
    this.fetchCategory(filter)
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.loader = false;
        this.categories = data.categories;
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

  deleteCategory(categoryId: number) {
    this._categoryGateway.deleteCategory(categoryId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let deletedCategory = this.categories.find((category) => category.id == categoryId);
        this.categories.splice(this.categories.indexOf(deletedCategory), 1);
      }
    });
  }

  updateCategory(editCategory: Category) {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: { 
        name: editCategory.name,
        description: editCategory.description,
      },
    });
    dialogRef.afterClosed().subscribe((categoryUpdated: CategoryDialogData) => {
      console.log("this is category updated");
      console.log(categoryUpdated);
      this._categoryGateway
        .updateCategory(editCategory.id, {
          name: categoryUpdated.name,
          description: categoryUpdated.description,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            editCategory.name = result.data.name;
            editCategory.description = result.data.description;
          }
        });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: CategoryDialogData) => {
      if (result !== undefined) {
        this._categoryGateway
        .postCategory({
            name: result.name,
            description: result.description,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.categories.push(Category.fromDTO(result.data));
            this.total++;
          }
        });
      }
    });
  }

  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getCategories({
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
      this.getCategories({
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

export interface CategoryFilter {
  per_page?: number;
  page?: number;
}
