import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Badge } from "../../model/badge";
import { MetricQuery } from "../../model/metric-query";

const ENDPOINTS = {
  getBadges: "getAllBadges",
  postBadge: "newBadge",
  putJoinRequest: (id: number) => `join-requests/${id}`,
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
