import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-has-role-card',
  templateUrl: './has-role-card.component.html',
  styleUrls: ['./has-role-card.component.scss']
})
export class HasRoleCardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HasRoleCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
