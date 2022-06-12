import { JoinRequest } from './../../model/join-request';
import { Injectable } from "@angular/core";
import { API } from "../api.service";

const ENDPOINTS = {
  getJoinRequest: "join-requests",
  postJoinRequest: "join-requests",
  putJoinRequest: (id: number) => `join-requests/${id}`,
  patchUserJoinRequest: (id: number) => `activate-volunteer/${id}`,
  patchJoinRequest: (id: number) => `join-requests/change-status/${id}`,
  deleteJoinRequest: (id: number) => `join-requests/${id}`,
};

@Injectable()
export class JoinRequestGateway {
  constructor(private api: API) {}

  getJoinRequest(filter: any): Promise<GetJoinRequestDto> {
    return this.api
      .get<any>(ENDPOINTS.getJoinRequest, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
          joinRequests: JoinRequest.fromDTOArray(data.data.data),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
        };
      });
  }

  postJoinRequest(joinRequest: JoinRequestDto) {
    return this.api.post(
      ENDPOINTS.postJoinRequest,
      {},
      {
        name: joinRequest.name,
        email: joinRequest.email,
        date_of_birth: joinRequest.date_of_birth,
        phone: joinRequest.phone,
        gender: joinRequest.gender,
        location: joinRequest.location,
        job: joinRequest.job,
        volunteering_history: joinRequest.volunteering_history,
      }
    );
  }

  updateJoinRequest(joinRequestId: number, data: JoinRequestDto) {
    return this.api.put(ENDPOINTS.putJoinRequest(joinRequestId), {}, { data });
  }

  deleteJoinRequest(joinRequestId: number) {
    return this.api.delete(ENDPOINTS.deleteJoinRequest(joinRequestId), {});
  }

  acceptJoinRequest(joinRequestId: number) {
    return this.api.patch(ENDPOINTS.patchJoinRequest(joinRequestId), {}, {}, {});
  }
  acceptUserJoinRequest(userId: number) {
    return this.api.patch(ENDPOINTS.patchUserJoinRequest(userId), {}, {}, {});
  }
}

export interface JoinRequestDto {
  name: string;
  username: string;
  email: string;
  date_of_birth: string;
  phone: string;
  gender: number;
  location: string;
  job: string;
  volunteering_history: string;
}


export interface GetJoinRequestDto {
  joinRequests: JoinRequest[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}