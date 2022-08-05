import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-questions-dialog',
  templateUrl: './show-questions-dialog.component.html',
  styleUrls: ['./show-questions-dialog.component.scss']
})
export class ShowQuestionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
