import { Admin } from './../../model/admin';
import { Injectable } from "@angular/core";
import { API } from "../api.service";

const ENDPOINTS = {
  getAdmins: "admins",
  getAdmin: (id: number) => `admins/${id}`,
  postRole: "roles",
  putRole: (id: number) => `roles/${id}`,
  deleteRole: (id: number) => `roles/${id}`,
};

@Injectable()
export class AdminGateway {
  constructor(private api: API) {}

  getAdmins(filter: any): Promise<GetAdminDto> {
    return this.api
      .get<any>(ENDPOINTS.getAdmins, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
            admins: Admin.fromDTOArray(data.data.data),
            current_page: data.data.current_page,
            links: data.data.links,
            total: data.data.total,
        }
      });
  }

  getAdmin(adminId: number): Promise<Admin> {
    return this.api
      .get<any>(ENDPOINTS.getAdmin(adminId), {}, null, null, {})
      .toPromise()
      .then((data) => {
        return Admin.fromDTO(data.data)
      });
  }

  /* postRole(role: RoleDto) {
    return this.api.post(
      ENDPOINTS.postRole,
      {},
      {
        name: role.name,
        guard_name: role.guardName == null ? "admin" : role.guardName,
        permissions: role.permissions,
      }
    );
  }

  updateRole(roleId: number, data: RoleDto) {
    return this.api.put(ENDPOINTS.putRole(roleId), {}, { data });
  }

  deleteRole(roleId) {
    return this.api.delete(ENDPOINTS.deleteRole(roleId), {});
  } */
}

export interface GetAdminDto {
    admins: Admin[];
    current_page: number;
    links: any[];
    total: number;
  }
