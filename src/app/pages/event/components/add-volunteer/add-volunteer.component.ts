import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss']
})
export class AddVolunteerComponent implements OnInit {

  public supervisorCheck = document.getElementById("option-1") as HTMLInputElement;
  public volunteerCheck = document.getElementById("option-2") as HTMLInputElement;

  constructor(
    public dialogRef: MatDialogRef<AddVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if(this.data.manager == true) {
      document.getElementById("option-1").click();
    }
    else if (this.data.volunteer == true) {
      document.getElementById("option-2").click();
    }
  }

  onItemChange(value){
    console.log(" Value is : ", value );
    if (value == "supervisor") {
      this.data.manager = true;
      this.data.volunteer = false;
    }
    else if (value == "volunteer") {
      this.data.manager = false;
      this.data.volunteer = true;
    }
 }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
