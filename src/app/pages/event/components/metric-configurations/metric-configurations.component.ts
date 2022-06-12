import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-metric-configurations',
  templateUrl: './metric-configurations.component.html',
  styleUrls: ['./metric-configurations.component.scss']
})
export class MetricConfigurationsComponent implements OnInit {
  /* fetchedPermissions: Permission[];
  permissionFilter: string = "";
  liPermissions: Permission[] = [];
  spanPermissions = [];
  permissionsId: number[] = []; */

  constructor(
    public dialogRef: MatDialogRef<MetricConfigurationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    
  }

  /* filterPermissions($event) {
    if (this.permissionFilter == "") {
      this.liPermissions = this.fetchedPermissions;
    } else {
      this.liPermissions = this.fetchedPermissions.filter((permission) =>
        permission.name.startsWith(this.permissionFilter)
      );
    }
    console.log($event);
    console.log(this.permissionFilter);
  }

  addPermissions($event) {
    let permissionName = $event.target.outerText;
    if (!this.spanPermissions.includes(permissionName)) {
      this.permissionFilter = "";
      this.liPermissions = this.fetchedPermissions;
      this.spanPermissions.push(permissionName);
      let p = this.fetchedPermissions.find(
        (permission) => permission.name === permissionName
      );
      this.data.permissionIds.push(p.id);
    }
  }

  removePermission($event) {
    let selectedPermission: Permission = this.fetchedPermissions.find(
      (permission) => permission.name == $event.target.outerText
    );
    let index = this.spanPermissions.indexOf(selectedPermission.name);
    this.spanPermissions.splice(index, 1);
    let indexId = this.data.permissionIds.indexOf(selectedPermission.id);
    this.data.permissionIds.splice(indexId, 1);
  } */

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface RoleDialogData {
  roleName: string;
}
