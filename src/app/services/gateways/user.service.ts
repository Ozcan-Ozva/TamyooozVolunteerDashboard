import { User } from './../../model/user';
import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Observable } from 'rxjs';

const ENDPOINTS = {
  getUsers: "users",
  getMe: "me",
  postRole: "roles",
  putRole: (id: number) => `roles/${id}`,
  deleteRole: (id: number) => `roles/${id}`,
};

@Injectable()
export class UserGateway {
  constructor(private api: API) {}

  getUsers(filter: any): Promise<GetUserDto> {
    return this.api
      .get<any>(ENDPOINTS.getUsers, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
          users: User.fromDTOArray(data.data.data),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
        };
      });
  }

  getMe(filter: any): Promise<User> {
    return this.api
      .get<any>(ENDPOINTS.getMe, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return User.fromDTO(data.data);
      });
  }

  getMyProfile(): Observable<User> {
    return this.api.get<User>(ENDPOINTS.getMe, {}, null, null, {});
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

export interface GetUserDto {
  users: User[];
  current_page: number;
  links: any[];
  total: number;
}
