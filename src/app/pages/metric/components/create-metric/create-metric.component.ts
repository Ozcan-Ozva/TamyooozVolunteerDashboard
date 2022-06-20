import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-metric',
  templateUrl: './create-metric.component.html',
  styleUrls: ['./create-metric.component.scss']
})
export class CreateMetricComponent implements OnInit {

  enumListValue : string[] = [];
  enumValue : string  = "";

  constructor(
    public dialogRef: MatDialogRef<CreateMetricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDialogData
  ) {}

  ngOnInit(): void {
    console.log("this is data");
    console.log(this.data);
    if(this.data.enums.length > 0) {
      this.data.enums.forEach(element => {
        this.enumListValue.push(element);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddEnumValue($event) {
    console.log("this is event");
    console.log($event);
    if ($event.keyCode == 13) {
      console.log("enter is pressed");
      this.enumListValue.push(this.enumValue);
      this.enumValue = "";
    }
    this.data.enums = this.enumListValue;
  }

  removeEnum($event) {
    let enumName = this.enumListValue.find(
      (c) => c == $event.target.outerText
    );
    let indexOfCategoryInDataCategory = this.data.enums.indexOf(
      enumName
    );
    let indexOfCategoryInSpanCategory = this.enumListValue.indexOf(
      enumName
    );
    this.data.enums.splice(indexOfCategoryInDataCategory, 1);
    this.enumListValue.splice(indexOfCategoryInSpanCategory, 1);
  }
}

export interface MetricDialogData {
  name: string;
  description: string;
  type: number;
  enums?: string[];
}

