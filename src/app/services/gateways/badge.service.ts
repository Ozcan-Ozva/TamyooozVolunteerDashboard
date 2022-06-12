import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Badge } from "../../model/badge";
import { MetricQuery } from "../../model/metric-query";
import { map, Observable } from "rxjs";

const ENDPOINTS = {
  getBadges: "getAllBadges",
  postBadge: "newBadge",
  userBadges: "userBadges",
  putJoinRequest: (id: number) => `join-requests/${id}`,
  badgeUsers: (id: number) => `badgeUsers/${id}`,
  patchJoinRequest: (id: number) => `join-requests/${id}`,
  deleteJoinRequest: (id: number) => `join-requests/${id}`,
};

@Injectable()
export class BadgeGateway {
  constructor(private api: API) {}

  getBadges(filter: any): Promise<Badge[]> {
    return this.api
      .get<any>(ENDPOINTS.getBadges, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return Badge.fromDTOArray(data);
      });
  }

  getUserBadges(filter: any) : Observable<Badge[]> {
    return this.api.get<any>(ENDPOINTS.userBadges, {}, null, null, filter);
  }

  getBadgeUsers(filter: any, badgeId: number) : Observable<any[]>{
    return this.api.get<any>(ENDPOINTS.badgeUsers(badgeId), {}, null, null, filter);
  }

  postBadge(badge: BadgeDto) {
    return this.api.post(
      ENDPOINTS.postBadge,
      {},
      {
        name: badge.name,
        description: badge.description,
        metric_queries: badge.metric_queries,
      }
    );
  }

  /* updateJoinRequest(joinRequestId: number, data: JoinRequestDto) {
    return this.api.put(ENDPOINTS.putJoinRequest(joinRequestId), {}, { data });
  }

  deleteJoinRequest(joinRequestId: number) {
    return this.api.delete(ENDPOINTS.deleteJoinRequest(joinRequestId), {});
  }

  acceptJoinRequest(joinRequestId: number) {
    return this.api.patch(ENDPOINTS.patchJoinRequest(joinRequestId), {}, {});
  } */
}

export interface BadgeDto {
  name: string;
  description: string;
  metric_queries: MetricQuery[];
}
