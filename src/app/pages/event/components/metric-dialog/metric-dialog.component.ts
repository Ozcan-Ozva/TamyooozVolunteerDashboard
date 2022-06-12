import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-metric-dialog",
  templateUrl: "./metric-dialog.component.html",
  styleUrls: ["./metric-dialog.component.scss"],
})
export class MetricDialogComponent implements OnInit {
  public metrics: any = [];
  public oneValue : any = [];

  constructor(
    public dialogRef: MatDialogRef<MetricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDialogData
  ) {}

  ngOnInit(): void {
    console.log("this is data");
    console.log(this.data);
    this.oneValue = this.data.metrics.oneValue;
    console.log("this is oneValue");
    console.log(this.oneValue);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface MetricDialogData {
  userName: string;
  metrics: any;
}
