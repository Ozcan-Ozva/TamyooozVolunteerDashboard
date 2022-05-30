import { Event } from "../../model/event";
import { Injectable } from "@angular/core";
import { API } from "../api.service";

const ENDPOINTS = {
  getEvents: "events",
  getEvent: (id: number) => `events/${id}`,
  postEvent: "events",
  putRole: (id: number) => `events/${id}`,
  deleteRole: (id: number) => `events/${id}`,
};

@Injectable()
export class EventGateway {
  constructor(private api: API) {}

  getEvents(filter: any): Promise<Event[]> {
    return this.api
      .get<any>(ENDPOINTS.getEvents, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return Event.fromDTOArray(data.data.data);
      });
  }

  getEvent(id: number): Promise<Event> {
    return this.api
      .get<any>(ENDPOINTS.getEvent(id), {}, null, null, {})
      .toPromise()
      .then((data) => {
        return Event.fromDTO(data.data);
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

  deleteEvent(eventId) {
    return this.api.delete(ENDPOINTS.deleteRole(eventId), {});
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
