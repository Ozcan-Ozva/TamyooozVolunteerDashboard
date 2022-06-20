import { Event } from "../../model/event";
import { Injectable } from "@angular/core";
import { API } from "../api.service";

const ENDPOINTS = {
  getEvents: "events",
  getEvent: (id: number) => `events/${id}`,
  postEvent: "events",
  changeState:(id: number) => `event/changeStatus/${id}`,
  /* {status: 1} */
  putRole: (id: number) => `events/${id}`,
  deleteRole: (id: number) => `events/${id}`,
  removeUserFromEvent: () => `events/remove-user`,
  changeUserRoleStatus: () => `events/change-user-role`,
};

@Injectable()
export class EventGateway {
  constructor(private api: API) {}

  getEvents(filter: any): Promise<GetEventDto> {
    return this.api
      .get<any>(ENDPOINTS.getEvents, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        console.log("this I am here is data");
        console.log(data);
        console.log("this is events");
        console.log(Event.fromDTOArray(data.data.data));
        return {
          events: Event.fromDTOArray(data.data.data),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
        };
      });
  }

  getEvent(id: number): Promise<Event> {
    return this.api
      .get<any>(ENDPOINTS.getEvent(id), {}, null, null, {})
      .toPromise()
      .then((data) => {
        return data.data;
      });
  }

  postEvent(event: EventDto) {
    return this.api.post(
      ENDPOINTS.postEvent,
      {},
      {
        name: event.name,
        description: event.description,
        start_date: event.start_date,
        required_volunteers_number: event.required_volunteers_number,
        end_date: event.end_date,
        users: event.users,
        metrics: event.metrics,
        categories: event.categories,
      }
    );
  }

  updateEvent(eventId: number, data: EventDto) {
    return this.api.put(ENDPOINTS.putRole(eventId), {}, { data });
  }

  updateEventState(eventId: number, data: any) {
    console.log("this is data");
    console.log(data);
    return this.api.patch(ENDPOINTS.changeState(eventId), {}, {} , data);
  }

  deleteEvent(eventId) {
    return this.api.delete(ENDPOINTS.deleteRole(eventId), {});
  }

  removeUserFromEvent(userId, eventId) {
    return this.api.get(
      ENDPOINTS.removeUserFromEvent(), {}, {'user_id': userId, 'event_id': eventId}
      ).toPromise()
      .then((data: any) => {
        return data.data;
      });
  }

  changeUserRoleStatus(userId, eventId) {
    return this.api.get(
      ENDPOINTS.changeUserRoleStatus(), {}, {'user_id': userId, 'event_id': eventId}
    ).toPromise()
      .then((data: any) => {
        return data.data;
      });
  }

}

export interface EventDto {
  name: string;
  description: string;
  start_date: string;
  required_volunteers_number: number;
  end_date: string;
  users: number[];
  metrics: number[];
  categories: number[];
}

export interface GetEventDto {
  events: Event[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}
