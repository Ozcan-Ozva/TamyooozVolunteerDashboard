import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { PointRule } from '../../model/point-rule';

const ENDPOINTS = {
  getPointRule: "getAllPointRules",
  postPointRule: "newPointRule",
  putJoinRequest: (id: number) => `join-requests/${id}`,
  patchJoinRequest: (id: number) => `join-requests/${id}`,
  deleteJoinRequest: (id: number) => `join-requests/${id}`,
};

@Injectable()
export class PointRuleGateway {
  constructor(private api: API) {}

  getPointRule(filter: any): Promise<PointRule[]> {
    return this.api
      .get<any>(ENDPOINTS.getPointRule, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return PointRule.fromDTOArray(data);
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
