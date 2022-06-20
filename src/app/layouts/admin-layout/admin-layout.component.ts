import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../model/user';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  me : User;
  public static loader$ = new Subject<boolean>();
  loader: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    AdminLayoutComponent.loader$.subscribe((value) => {
      this.loader = value;
    })
    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data.subscribe((response: any) => {
      console.log('My Profile FETCHING', response);
      this.me = response.me.data;
      console.log('My Profile FETCHED');
      console.log(this.me);
    });
  }

}
