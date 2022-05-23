import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public _categoryGateway: CategoryGateway,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchCategory({})
      .then((data) => {
        this.categories = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchCategory(filter: any) {
    return this._categoryGateway.getCategory({});
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
          }
        });
      }
    });
  }
}
