import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Badge } from "../../model/badge";

const ENDPOINTS = {
  getBadges: "getAllBadges",
  postPointRule: "newPointRule",
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

  postPointRule(pointRole: PointRoleDto) {
    return this.api.post(
      ENDPOINTS.postPointRule,
      {},
      {
        rule_name: pointRole.rule_name,
        description: pointRole.description,
        points: pointRole.points,
        metric_queries: {
            metric_id: pointRole.metric_queries.metric_id,
            first_operation: pointRole.metric_queries.first_operation,
        }
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

export interface PointRoleDto {
    rule_name: string;
    description: string;
    points: number;
    metric_queries: {
      metric_id: number,
      first_operation: string,
    };
  }
