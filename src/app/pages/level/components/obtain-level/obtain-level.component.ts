import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../model/user';
import { LevelGateway } from '../../../../services/gateways/level.service';

@Component({
  selector: 'app-obtain-level',
  templateUrl: './obtain-level.component.html',
  styleUrls: ['./obtain-level.component.scss']
})
export class ObtainLevelComponent implements OnInit {

  owners: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<ObtainLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _levelGateway: LevelGateway,
  ) {}

  ngOnInit(): void {
    this._levelGateway.getObtainUser(this.data.id)
    .then((data) => {
      console.log("this is data");
      console.log(data);
      if (data.length > 0) {
        console.log(User.fromDTOArray(data[0].users));
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
