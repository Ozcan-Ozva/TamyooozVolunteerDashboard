import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-create-level-dialog",
  templateUrl: "./create-level-dialog.component.html",
  styleUrls: ["./create-level-dialog.component.scss"],
})
export class CreateLevelDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LevelDialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface LevelDialogData {
  level_name : string;
  min_points: number;
  level: number;
  start_points: number;
}
