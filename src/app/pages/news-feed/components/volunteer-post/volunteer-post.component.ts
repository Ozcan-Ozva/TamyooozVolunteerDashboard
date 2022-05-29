import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer-post',
  templateUrl: './volunteer-post.component.html',
  styleUrls: ['./volunteer-post.component.scss'],
  animations:  [
    trigger('openClose', [
        state('open', style({
            height: '*',
            opacity: 1,
            'content-visibility': 'visible',
        })),
        state('closed', style({
            height: '0px',
            'content-visibility': 'hidden',
            opacity: 0,
        })),
        transition('open => closed', [
            animate('0.35s')
        ]),
        transition('closed => open', [
            animate('0.35s')
        ]),
    ]),
]
})
export class VolunteerPostComponent implements OnInit {

  hideCommentsButtonLabel = "Hide Comments";
  checkBoxHideButtonValue : boolean = true;

  comments : number = 10;
  like : number = 21;
  reposts: number = 41;

  constructor() { }

  ngOnInit(): void {
  }

  addNewComment() {

  }

  addLike() {

  }

  addRepost() {

  }

  showHideComments() {
    if(!this.checkBoxHideButtonValue) {
      this.hideCommentsButtonLabel = "Hide Comments";
    }
    else {
      this.hideCommentsButtonLabel = "Show Comments";
    }
  }

}
