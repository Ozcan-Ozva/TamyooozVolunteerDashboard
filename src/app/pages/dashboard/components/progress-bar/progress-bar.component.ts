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
    console.log("this is activeCircles");
    console.log(activeCircles);
    console.log("this is stepCircles");
    console.log(this.stepCircles);
    console.log("this is width");
    console.log(((activeCircles.length - 1) / (this.stepCircles.length - 1)) * 100);
    
    this.progress.style.width =
      ((activeCircles.length - 1) / (this.stepCircles.length + 1)) * 100 + "%";  
  }
}
