import { Component, Input, OnInit } from '@angular/core';
import { Level } from '../../../../model/level';

@Component({
  selector: 'app-level-progress',
  templateUrl: './level-progress.component.html',
  styleUrls: ['./level-progress.component.scss']
})
export class LevelProgressComponent implements OnInit {

  @Input() level : Level;

  constructor() { }

  ngOnInit(): void {
  }

}
