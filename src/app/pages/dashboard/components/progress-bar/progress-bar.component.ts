import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent implements OnInit {
  progress : HTMLElement;
  stepCircles : NodeListOf<Element>;
  currentActive = 1;

  constructor() {}

  ngOnInit(): void {
    this.progress = document.getElementById("progress");
    this.stepCircles = document.querySelectorAll(".circle");
    console.log("this is progress");
    console.log(this.progress);
    console.log("this is stepCircles");
    console.log(this.stepCircles);
  }

  ngAfterViewInit() {
    this.update(2);
  }

  update(currentActive) {
    this.stepCircles.forEach((circle, i) => {
      if (i < currentActive) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
  
    const activeCircles = document.querySelectorAll(".active");
    this.progress.style.width =
      ((activeCircles.length - 1) / (this.stepCircles.length - 1)) * 100 + "%";  
  }
}
