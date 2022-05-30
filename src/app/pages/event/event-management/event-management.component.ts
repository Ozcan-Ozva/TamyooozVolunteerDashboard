import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventGateway } from "../../../services/gateways/event.service";
import { Event } from "../../../model/event";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-event-management",
  templateUrl: "./event-management.component.html",
  styleUrls: ["./event-management.component.scss"],
})
export class EventManagementComponent implements OnInit {
  private sub: any;
  private id;
  public event: Event = {
    id: 0,
    name: "",
    categories: [],
    created_at: new Date(),
    description: "",
    end_date: new Date(),
    media: null,
    required_volunteers_number: 0,
    start_date: new Date(),
    status: null,
    updated_at: new Date(),
  };
  public loader: boolean = true;

  images = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageAlt: "nature1",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageAlt: "nature2",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
      imageAlt: "person1",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageAlt: "person2",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1526976668912-1a811878dd37?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
      imageAlt: "person3",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1617450365226-9bf28c04e130?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
      imageAlt: "person4",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
      imageAlt: "person5",
    },
  ];

  constructor(private route: ActivatedRoute, private _eventGateway: EventGateway) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      console.log("this is id");
      console.log(this.id);
      this.fetchEvent(this.id)
      .then((data) => {
        console.log("this is event");
        console.log(data);
        this.event = data;
        this.loader = false;
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    });
  }

  private async fetchEvent(id: number) {
    return this._eventGateway.getEvent(id);
  }
}
