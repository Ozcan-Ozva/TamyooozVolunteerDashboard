import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Permission } from "../../../../model/permission";
import { Role } from "../../../../model/role";
import { PermissionGateway } from "../../../../services/gateways/permission.service";

@Component({
  selector: "app-create-role",
  templateUrl: "./create-role.component.html",
  styleUrls: ["./create-role.component.scss"],
})
export class CreateRoleComponent implements OnInit {
  fetchedPermissions: Permission[];
  permissionFilter: string = "";
  liPermissions: Permission[] = [];
  spanPermissions = [];
  permissionsId: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    public _permissionGateway: PermissionGateway,
    @Inject(MAT_DIALOG_DATA) public data: RoleDialogData
  ) {}

  ngOnInit(): void {
    this.data.cancelled = false;
    this.fetchPermissions({})
      .then((data) => {
        console.log(data);
        this.fetchedPermissions = data;
        this.liPermissions = data;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    if (this.data.role !== undefined) {
      console.log("this is edited role");
      this.data.role.permissions.forEach((element) => {
        this.spanPermissions.push(element.name);
        this.permissionsId.push(element.id);
      });
    }
  }

  filterPermissions($event) {
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
  }

  private async fetchPermissions(filter: any) {
    return this._permissionGateway.getPermissions({});
  }

  onNoClick(): void {
    this.data.cancelled = true;
    this.dialogRef.close();
  }
}

export interface RoleDialogData {
  roleName: string;
  role?: Role;
  permissionIds: number[];
  cancelled: boolean;
}
