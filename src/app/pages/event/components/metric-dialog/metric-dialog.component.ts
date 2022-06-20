import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MetricGateway } from "../../../../services/gateways/metric.service";

@Component({
  selector: "app-metric-dialog",
  templateUrl: "./metric-dialog.component.html",
  styleUrls: ["./metric-dialog.component.scss"],
})
export class MetricDialogComponent implements OnInit {

  variableMetrics = [];
  listMetrics = [];

  constructor(
    public dialogRef: MatDialogRef<MetricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _metricGateway: MetricGateway
  ) {}

  ngOnInit(): void {
    console.log("this is data");
    console.log(this.data);
    this._metricGateway.getUserEventMetrics(this.data.eventId, this.data.userId)
      .subscribe((data) => {
        console.log("this is data");
        console.log(data);
        this.variableMetrics = data.data.oneValue;
        this.listMetrics = data.data.listValue;
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addOne() {
    console.log("I am work");
    this.variableMetrics.push({
      name: "AHmaD",
    })
  }
}

export interface MetricDialogData {
  userName: string;
  eventId: number,
  userId: number,
}
