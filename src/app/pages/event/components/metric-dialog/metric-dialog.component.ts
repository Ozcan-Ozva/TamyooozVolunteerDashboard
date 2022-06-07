import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-metric-dialog',
  templateUrl: './metric-dialog.component.html',
  styleUrls: ['./metric-dialog.component.scss']
})
export class MetricDialogComponent implements OnInit {

  public metrics: any = [];

  constructor(
    public dialogRef: MatDialogRef<MetricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDialogData,
     ) { }

    ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface MetricDialogData {
  userName: string;
  metrics: any ;
}
