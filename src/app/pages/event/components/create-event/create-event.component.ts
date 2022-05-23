import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.scss"],
})
export class CreateEventComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventtDialogData
  ) {}

  ngOnInit(): void {
    console.log("this is dataa");
    console.log(this.data);
    let pipe = new DatePipe('en-US');
    this.data.start_date = pipe.transform(this.data.start_date, 'yyyy-MM-dd');
    this.data.end_date = pipe.transform(this.data.end_date, 'yyyy-MM-dd');
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

