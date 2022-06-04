import { Role } from "../../model/role";
import { Injectable } from "@angular/core";
import { API } from "../api.service";

const ENDPOINTS = {
  getRoles: "roles",
  postRole: "roles",
  putRole: (id: number) => `roles/${id}`,
  deleteRole: (id: number) => `roles/${id}`,
};

@Injectable()
export class RolesGateway {
  constructor(private api: API) {}

  getRoles(filter: any): Promise<GetRoleDto> {
    return this.api
      .get<any>(ENDPOINTS.getRoles, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
          roles: Role.fromDTOArray(data.data),
          current_page: data.current_page,
          links: data.links,
          total: data.total,
          last_page: data.last_page,
          from: data.from,
        };
      });
  }

  postRole(role: RoleDto) {
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
    return this.api.put(ENDPOINTS.putRole(roleId), {}, { 
      name: data.name,
      permissions: data.permissions
     });
  }

  deleteRole(roleId) {
    return this.api.delete(ENDPOINTS.deleteRole(roleId), {});
  }
}

export interface RoleDto {
  name: string;
  guardName?: string;
  permissions: number[];
}

export interface GetRoleDto {
  roles: Role[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}