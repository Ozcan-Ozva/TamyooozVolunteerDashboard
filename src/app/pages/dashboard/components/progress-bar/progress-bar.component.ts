import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent implements OnInit {
  progress : HTMLElement;
  stepCircles : NodeListOf<Element>;

  constructor() {}

  ngOnInit(): void {
    this.progress = document.getElementById("progress");
    this.stepCircles = document.querySelectorAll(".circle");
  }

  ngAfterViewInit() {
    this.update(1);
  }

  update(currentActive) {
    this.stepCircles.forEach((circle, i) => {
      console.log("this is i");
      console.log(i);
      if (i < currentActive) {
        console.log("i am here");
        circle.classList.add("active-circle");
      } else {
        console.log("i am not here");
        circle.classList.remove("active-circle");
      }
    });
  
    const activeCircles = document.querySelectorAll(".active-circle");
    console.log("this is activeCircles");
    console.log(activeCircles);
    console.log("this is stepCircles");
    console.log(this.stepCircles);
    console.log("this is width");
    console.log(((activeCircles.length -1) / (this.stepCircles.length)) * 100);
    
    this.progress.style.width =
      ((activeCircles.length - 0.3) / (this.stepCircles.length)) * 100 + "%";  
  }
}
