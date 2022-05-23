import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-join-request',
  templateUrl: './create-join-request.component.html',
  styleUrls: ['./create-join-request.component.scss']
})
export class CreateJoinRequestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateJoinRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JoinRequestDialogData
  ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  public onDate(event): void {
    console.log("this is event");
    console.log(event);
    this.data.date_of_birth = event;
  }

}


export interface JoinRequestDialogData {
  name: string;
  email: string;
  date_of_birth: string;
  phone: string;
  gender: number;
  location: string;
  job: string;
  volunteering_history: string;
}
