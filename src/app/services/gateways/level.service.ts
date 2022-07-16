import { Role } from "../../model/role";
import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Level } from "../../model/level";

const ENDPOINTS = {
  getLevels: "levels",
  postLevel: "levels",
  getObtainUser: (id: number) => `levelVolunteer/${id}`,
  /* postRole: "roles",
  putRole: (id: number) => `roles/${id}`,
  deleteRole: (id: number) => `roles/${id}`, */
};

@Injectable()
export class LevelGateway {
  constructor(private api: API) {}

  getLevels(filter: any): Promise<GetLevelDto> {
    return this.api
      .get<any>(ENDPOINTS.getLevels, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
          levels: Level.fromDTOArray(data.data.data),
          current_page: data.current_page,
          links: data.links,
          total: data.total,
          last_page: data.last_page,
          from: data.from,
        };
      });
  }

  getObtainUser(levelId : number): Promise<any> {
    return this.api
      .get<any>(ENDPOINTS.getObtainUser(levelId), {}, null, null, {})
      .toPromise()
      .then((data) => {
        return data.data;
      });
  }

  postLevel(level: LevelDto) {
    return this.api.post(
      ENDPOINTS.postLevel,
      {},
      {
        level_name: level.level_name,
        level : level.level,
        start_points: level.start_points,
        min_points: level.min_points,
      }
    );
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
    return this.api.put(ENDPOINTS.putRole(roleId), {}, { 
      name: data.name,
      permissions: data.permissions
     });
  }

  deleteRole(roleId) {
    return this.api.delete(ENDPOINTS.deleteRole(roleId), {});
  } */
}

export interface LevelDto {
  level_name: string;
  level: number;
  start_points : number;
  min_points : number;
}

export interface GetLevelDto {
  levels: Level[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}