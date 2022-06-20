import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EventGateway } from "../../../services/gateways/event.service";
import {
  CreateEventComponent,
  EventtDialogData,
} from "../components/create-event/create-event.component";
import { Event } from "../../../model/event";
import { Router } from "@angular/router";
import { debounceTime, Subject, Subscription } from "rxjs";

import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  public events: Event[];
  /* These attributes is sharable */
  public per_page: number = 10;
  valueChanged: Subject<number> = new Subject<number>();
  inputSub: Subscription;
  public current_page: number = 1;
  public links: any[] = [];
  public total: number = 0;
  public loader: boolean = true;
  public lastPage: number = 0;
  public from = 1;
  /* End sharable attributes */

  constructor(
    public _eventGateway: EventGateway,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.getEvents({
      per_page: this.per_page,
      page: 1,
    });
  }

  ngAfterViewInit() {
    this.inputSub = this.valueChanged
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.per_page = value;
        console.log(value);
        if (this.per_page !== null && this.per_page !== 0) {
          this.getEvents({
            per_page: this.per_page,
            page: this.current_page,
          });
        }
      });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  private async fetchEvent(filter: any) {
    this.loader = true;
    return this._eventGateway.getEvents(filter);
  }

  private getEvents(filter : EventFilter) {
    this.fetchEvent(filter)
      .then((data) => {
        this.loader = false;
        this.events = data.events;
        this.current_page = data.current_page;
        this.links = data.links;
        this.links.pop();
        this.links.pop();
        this.total = data.total;
        this.lastPage = data.last_page;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
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
        usersId: [],
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
          users: eventResult.usersId,
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
      data: {
        name: "",
        description: "",
        start_date: "",
        required_volunteers_number: 0,
        end_date: "",
        usersId: [],
        metrics: [],
        categories: [],
      },
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
            users: eventResult.usersId,
            metrics: eventResult.metrics,
            categories: eventResult.categories,
          })
          .subscribe((result: any) => {
            if (result.status_code === 200) {
              this.events.push(Event.fromDTO(result.data));
              this.total++;
            }
          });
      }
    });
  }

  navigateToEvent(id: number) {
    this.router.navigate(["event/manage-event", id]);
  }

  /* Those method is for pagination */
  changeTableIndex(index: number) {
    this.current_page = index;
    this.getEvents({
      per_page: this.per_page,
      page: this.current_page,
    });
  }

  checkHidden(index) {
    if (index - this.current_page <= 2 && index - this.current_page >= -2) {
      return "visible";
    }
    else {
      return "hidden";
    }
  }

  checkFirstIndex() {
    if (this.current_page - 1 > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  checkLastIndex() {
    if (this.lastPage - this.current_page > 2) {
      return "visible"
    }
    else {
      return "hidden";
    }
  }

  nextPage(next: boolean) {
    if (
      (this.current_page != this.lastPage && next) ||
      (this.current_page != this.from && !next)
    ) {
      if (next) this.current_page++;
      else this.current_page--;
      this.getEvents({
        per_page: this.per_page,
        page: this.current_page,
      });
    }
  }

  checkPreviousClass() {
    if (this.from == this.current_page)
      return "disable-pagination-button";
  }

  checkNextClass() {
    if (this.lastPage == this.current_page)
      return "disable-pagination-button";
  }

  changePerPage() {
    this.valueChanged.next(this.per_page);
  }

  getClassName(index: number) {
    if (this.current_page == index) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }

  getEventStatusText(status) {
    switch (status) {
      case 0: {
        return {
          text: 'ESTABLISHING',
          class: 'bg-warning'
        };
        break;
      }
      case 1: {
        return {
          text: 'RECRUITING',
          class: 'bg-info'
        };
        break;
      }
      case 2: {
        return {
          text: 'IN_PROGRESS',
          class: 'bg-success'
        };
        break;
      }
      case 3: {
        return {
          text: 'ENDED',
          class: 'bg-success'
        };
        break;
      }
      case 4: {
        return {
          text: 'ARCHIVED',
          class: 'bg-danger'
        };
        break;
      }
      case 5: {
        return {
          text: 'PAUSED',
          class: 'bg-danger'
        };
        break;
      }
      case 6: {
        return {
          text: 'ABORTED',
          class: 'bg-danger'
        };
        break;
      }

    }

  }
  /* End Method */
}

export interface EventFilter {
  per_page?: number;
  page?: number;
}
