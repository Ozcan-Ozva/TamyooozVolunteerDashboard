import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Category } from "../../../../model/category";
import { Metric } from "../../../../model/metric";
import { CategoryGateway } from "../../../../services/gateways/category.service";
import { MetricGateway } from "../../../../services/gateways/metric.service";

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent implements OnInit {

  public categories: Category[] = [];
  public metrics: Metric[] = [];
  public categorySpan : string[] = [];
  public metricSpan : string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventtDialogData,
    public _categoryGateway: CategoryGateway,
    public _metricGateway: MetricGateway,
  ) {}

  ngOnInit(): void {
    console.log("this is dataa");
    console.log(this.data);
    let pipe = new DatePipe('en-US');
    this.data.start_date = pipe.transform(this.data.start_date, 'yyyy-MM-dd');
    this.data.end_date = pipe.transform(this.data.end_date, 'yyyy-MM-dd');
    this.fetchCategory({})
      .then((data) => {
        this.categories = data.categories;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    this.fetchMetric({})
      .then((data) => {
        this.metrics = data.metrics;
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

  private async fetchMetric(filter: any) {
    return this._metricGateway.getMetrix({});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeCategory($event) {
    if (!(this.categorySpan.includes($event.target.value)) && $event.target.value != "") {
      let categoryId = this.categories.find((c) => c.name == $event.target.value).id;
      this.data.categories.push(categoryId);
      this.categorySpan.push($event.target.value);
    }
  }

  onChangeMetric($event) {
    if (!(this.metricSpan.includes($event.target.value)) && $event.target.value != "") {
      let metricId = this.metrics.find((m) => m.name == $event.target.value).id;
      this.data.metrics.push(metricId);
      this.metricSpan.push($event.target.value);
    }
  }

  removeMetric($event) {
    let metric = this.metrics.find((m) => m.name == $event.target.outerText);
    let indexOfMetricInDataMetric = this.data.metrics.indexOf(metric.id);
    let indexOfMetricInSpanMetric = this.metricSpan.indexOf(metric.name);
    this.data.metrics.splice(indexOfMetricInDataMetric,1);
    this.metricSpan.splice(indexOfMetricInSpanMetric,1);
  }

  removeCategory($event) {
    let category = this.categories.find((c) => c.name == $event.target.outerText);
    let indexOfCategoryInDataCategory = this.data.categories.indexOf(category.id);
    let indexOfCategoryInSpanCategory = this.categorySpan.indexOf(category.name);
    this.data.categories.splice(indexOfCategoryInDataCategory,1);
    this.categorySpan.splice(indexOfCategoryInSpanCategory,1);
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

