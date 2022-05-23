import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Category } from "../../../../model/category";
import { CategoryGateway } from "../../../../services/gateways/category.service";

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent implements OnInit {

  public categories: Category[] = []

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventtDialogData,
    public _categoryGateway: CategoryGateway
  ) {}

  ngOnInit(): void {
    console.log("this is dataa");
    console.log(this.data);
    let pipe = new DatePipe('en-US');
    this.data.start_date = pipe.transform(this.data.start_date, 'yyyy-MM-dd');
    this.data.end_date = pipe.transform(this.data.end_date, 'yyyy-MM-dd');
    this.fetchCategory({})
      .then((data) => {
        this.categories = data;
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface EventtDialogData {
  name: string;
  description: string;
  start_date: string;
  required_volunteers_number: number;
  end_date: string;
  users: number[];
  metrics: number[];
  categories: number[];
}

