import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-metric',
  templateUrl: './create-metric.component.html',
  styleUrls: ['./create-metric.component.scss']
})
export class CreateMetricComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateMetricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDialogData
  ) {}

  ngOnInit(): void {
    console.log("this is data");
    console.log(this.data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface MetricDialogData {
  name: string;
  description: string;
  type: number;
}

