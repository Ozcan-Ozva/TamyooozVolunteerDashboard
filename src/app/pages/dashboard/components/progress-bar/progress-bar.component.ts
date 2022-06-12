import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent implements OnInit {
  eventStatusList: boolean[] = [false, false, false, false];
  progressWidth: string = "0%";
  @Input() eventStatus: number = 0;

  constructor() {}

  ngOnInit(): void {
    console.log("this is event status");
    console.log(this.eventStatus);
  }

  ngAfterViewInit() {
    this.initiateStateList(this.eventStatus);
  }

  getActiveCircleClass(state : boolean) {
    if(state) {
      return "circle active-circle";
    }
    else {
      return "circle";
    }
  }

  initiateStateList(activeStateNum: number) {
    this.eventStatusList = [false, false, false, false];
    if (activeStateNum < 5) {
      for (let index = 0; index <= activeStateNum; index++) {
        this.eventStatusList[index] = true;
      }
      this.calculateProgressWidth(activeStateNum);
    }
  }

  calculateProgressWidth(activeStateNum: number) {
    activeStateNum++;
    this.progressWidth = 
    ((activeStateNum - 0.3) / this.eventStatusList.length) * 100 + "%"
  }
}
