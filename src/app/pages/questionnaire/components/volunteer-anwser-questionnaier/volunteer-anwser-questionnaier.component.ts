import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-volunteer-anwser-questionnaier',
  templateUrl: './volunteer-anwser-questionnaier.component.html',
  styleUrls: ['./volunteer-anwser-questionnaier.component.scss']
})
export class VolunteerAnwserQuestionnaierComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VolunteerAnwserQuestionnaierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("this is data");
    console.log(this.data);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
