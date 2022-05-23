import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Role } from "../../model/role";
import { RolesGateway } from "../../services/gateways/roles.service";

import {
  CreateRoleComponent,
  RoleDialogData,
} from "./components/create-role/create-role.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-role-and-permission",
  templateUrl: "./role-and-permission.component.html",
  styleUrls: ["./role-and-permission.component.scss"],
})
export class RoleAndPermissionComponent implements OnInit {
  public roles: Role[];
  public loader: boolean = true;
  public fackeList: number[] = [
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
  ];

  constructor(public _rolesGateway: RolesGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchRoles({})
      .then((data) => {
        this.roles = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchRoles(filter: any) {
    return this._rolesGateway.getRoles({});
  }

  deleteRole(roleId: number) {
    this._rolesGateway.deleteRole(roleId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let role = this.roles.find((role) => role.id == roleId);
        this.roles.splice(this.roles.indexOf(role), 1);
      }
    });
  }

  updateRole(editRole: Role) {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      data: { roleName: editRole.name, permissionIds: [], role: editRole },
    });
    dialogRef.afterClosed().subscribe((roleResult: RoleDialogData) => {
      console.log("this is roleResult");
      console.log(roleResult);
      this._rolesGateway
        .updateRole(editRole.id, {
          name: roleResult.roleName,
          permissions: roleResult.permissionIds,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.roles.slice(
              this.roles.indexOf(this.roles.find((role) => role.id === editRole.id)),
              1
            );
            this.roles.push(Role.fromDTO(result.data));
          }
        });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      data: { roleName: "HRM", permissionIds: [] },
    });
    dialogRef.afterClosed().subscribe((roleResult: RoleDialogData) => {
      if(!roleResult.cancelled) {
        this._rolesGateway
        .postRole({
          name: roleResult.roleName,
          permissions: roleResult.permissionIds,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.roles.push(Role.fromDTO(result.data));
          }
        });
      }
    });
  }
}
