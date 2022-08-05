import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Leaderboard } from "../../model/leaderboard";
import { LeaderboardDialogData } from "../../pages/leaderboard/components/create-leaderboard-dialog/create-leaderboard-dialog.component";

const ENDPOINTS = {
  getLeaderboards: "leaderboardsVolunteers",
  postLeaderboard: "newLeaderboardTable",
  getObtainUser: (id: number) => `levelVolunteer/${id}`,
  /* postRole: "roles",
  putRole: (id: number) => `roles/${id}`,
  deleteRole: (id: number) => `roles/${id}`, */
};

@Injectable()
export class LeaderboardGateway {
  constructor(private api: API) {}

  getLeaderboards(filter: any): Promise<GetLevelDto> {
    return this.api
      .get<any>(ENDPOINTS.getLeaderboards, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
          leaderboards: Leaderboard.fromDTOArray(data.data),
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

  postLeaderboard(leaderboard: LeaderboardDialogData) {
    leaderboard.metric_queries.forEach(element => {
      delete element.compare_value;
      delete element.compare_operation;
    });
    return this.api.post(
      ENDPOINTS.postLeaderboard,
      {},
      {
        name: leaderboard.name,
        description: leaderboard.description,
        table_size : +leaderboard.table_size,
        metric_queries: leaderboard.metric_queries[0],
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
  leaderboards: Leaderboard[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}