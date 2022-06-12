import { Component, Input, OnInit } from '@angular/core';
import { Event } from "../../../../model/event";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() events : Event[];

  constructor() { }

  ngOnInit(): void {
    console.log("this is events");
    console.log(this.events);
  }

}
