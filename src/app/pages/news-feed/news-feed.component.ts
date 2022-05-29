import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {


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

  constructor() { }

  ngOnInit(): void {
  }

  openCity(evt, volunteerType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(volunteerType).style.display = "block";
    evt.currentTarget.className += " active";
  }
}
