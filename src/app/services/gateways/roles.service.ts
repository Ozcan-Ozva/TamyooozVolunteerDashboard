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

  getRoles(filter: any): Promise<Role[]> {
    return this.api
      .get<any>(ENDPOINTS.getRoles, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return Role.fromDTOArray(data.data);
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
    return this.api.put(ENDPOINTS.putRole(roleId), {}, { data });
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
