import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Event } from "../../model/event";
import { EventGateway } from "../../services/gateways/event.service";
import {
  CreateEventComponent,
  EventtDialogData,
} from "./components/create-event/create-event.component";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  public events: Event[];
  public loader: boolean = true;
  public fackeList: number[] = [
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
    ,
    1,
    1,
    1,
    1,
  ];

  constructor(public _eventGateway: EventGateway, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchEvent({})
      .then((data) => {
        console.log("this is event");
        console.log(data);
        this.events = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async fetchEvent(filter: any) {
    return this._eventGateway.getEvents({});
  }

  deleteEvent(eventId: number) {
    this._eventGateway.deleteEvent(eventId).subscribe((result: any) => {
      if (result.status_code === 200) {
        let event = this.events.find((event) => event.id == eventId);
        this.events.splice(this.events.indexOf(event), 1);
      }
    });
  }

  updateEvent(editEvent: Event) {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      data: {
        name: editEvent.name,
        description: editEvent.description,
        start_date: editEvent.start_date,
        required_volunteers_number: editEvent.required_volunteers_number,
        end_date: editEvent.end_date,
        users: [],
        metrics: [],
        categories: editEvent.categories,
      },
    });
    dialogRef.afterClosed().subscribe((eventResult: EventtDialogData) => {
      console.log("this is roleResult");
      console.log(eventResult);
      this._eventGateway
        .updateEvent(editEvent.id, {
          name: eventResult.name,
          description: eventResult.description,
          start_date: eventResult.start_date,
          required_volunteers_number: eventResult.required_volunteers_number,
          end_date: eventResult.end_date,
          users: eventResult.users,
          metrics: eventResult.metrics,
          categories: eventResult.categories,
        })
        .subscribe((result: any) => {
          if (result.status_code === 200) {
            this.events.slice(
              this.events.indexOf(
                this.events.find((event) => event.id === editEvent.id)
              ),
              1
            );
            this.events.push(Event.fromDTO(result.data));
          }
        });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((eventResult: EventtDialogData) => {
      if (eventResult !== undefined) {
        this._eventGateway
          .postEvent({
            name: eventResult.name,
            description: eventResult.description,
            start_date: eventResult.start_date,
            required_volunteers_number: eventResult.required_volunteers_number,
            end_date: eventResult.end_date,
            users: eventResult.users,
            metrics: eventResult.metrics,
            categories: eventResult.categories,
          })
          .subscribe((result: any) => {
            if (result.status_code === 200) {
              this.events.push(Event.fromDTO(result.data));
            }
          });
      }
    });
  }
}
