import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Role } from "../../model/role";
import { RolesGateway } from "../../services/gateways/roles.service";

import {
  CreateRoleComponent,
  RoleDialogData,
} from "./components/create-role/create-role.component";
import { MatDialog } from "@angular/material/dialog";
import { debounceTime, Subject, Subscription } from "rxjs";

@Component({
  selector: "app-role-and-permission",
  templateUrl: "./role-and-permission.component.html",
  styleUrls: ["./role-and-permission.component.scss"],
})
export class RoleAndPermissionComponent implements OnInit {
  public roles: Role[];
  /* These attributes is sharable */
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
  public loader: boolean = true;
  public lastPage: number = 0;
  public from = 1;
  /* End sharable attributes */
  /* public fackeList: number[] = [
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
  ]; */

  constructor(public _rolesGateway: RolesGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.getRoles();
  }

  ngAfterViewInit() {
    this.inputSub = this.valueChanged
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.per_page = value;
        console.log(value);
        if (this.per_page !== null && this.per_page !== 0) {
          this.getRoles();
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchRoles(filter: any) {
    this.loader = true;
    return this._rolesGateway.getRoles({});
  }

  private getRoles() {
    this.fetchRoles({})
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.loader = false;
        this.roles = data.roles;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.lastPage = data.last_page;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
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
    let permissionsIds : number[] = [];
    editRole.permissions.forEach(element => {
      permissionsIds.push(element.id);
    }); 
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      data: { roleName: editRole.name, permissionIds: permissionsIds, role: editRole },
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
            let indexOfItem = this.roles.indexOf(editRole);
            this.roles.splice(indexOfItem, 1);
            this.roles.splice(indexOfItem, 0 ,Role.fromDTO(result.data));
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
            this.total++;
          }
        });
      }
    });
  }

  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getRoles();
  }

  checkHidden(index) {
    console.log("this is index hidden visible");
    console.log(index);
    if (index - this.current_page <= 2 && index - this.current_page >= -2) {
      console.log("visable");
      return "visible";
    }
    else {
      console.log("hidden");
      return "hidden";
    }
  }

  checkFirstIndex() {
    if (this.current_page - 1 > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  checkLastIndex() {
    if (this.lastPage - this.current_page > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  nextPage(next: boolean) {
    if (
      (this.current_page != this.lastPage && next) ||
      (this.current_page != this.from && !next)
    ) {
      if (next) this.current_page++;
      else this.current_page--;
      this.getRoles();
    }
  }

  checkPreviousClass() {
    if (this.from == this.current_page)
      return "disable-pagination-button";
  }

  checkNextClass() {
    if (this.lastPage == this.current_page)
      return "disable-pagination-button";
  }

  changePerPage() {
    this.valueChanged.next(this.per_page);
  }

  getClassName(index: number) {
    if (this.current_page == index) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }
  /* End Method */
}
