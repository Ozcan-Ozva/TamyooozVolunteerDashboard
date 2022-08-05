import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/role-and-permission', title: 'Role',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/point-rule', title: 'Point Role',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/join-request', title: 'Join request',  icon:'ni-planet text-blue', class: '' },
    { path: '/badge', title: 'Badge',  icon:'ni-planet text-blue', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/metric', title: 'Metric',  icon:'ni-key-25 text-orange', class: '' },
    { path: '/news-feed', title: 'News Feed',  icon:'ni-key-25 text-orange', class: '' },
    { path: '/messages', title: 'Messages',  icon:'ni-key-25 text-orange', class: '' },
    { path: '/event', title: 'Event',  icon:'ni-key-25 text-orange', class: '' },
    { path: '/volunteers', title: 'Volunteers',  icon:'ni-single-02 text-orange', class: '' },
    { path: '/category', title: 'Categories',  icon:'ni-single-02 text-orange', class: '' },
    { path: '/levels', title: 'Levels',  icon:'ni-single-02 text-orange', class: '' },
    { path: '/leaderboards', title: 'Leaderboards',  icon:'ni-single-02 text-orange', class: '' },
    { path: '/inventories', title: 'Inventories',  icon:'ni-single-02 text-orange', class: '' },
    { path: '/questionnaire', title: 'Questionnaire',  icon:'ni-single-02 text-orange', class: '' },
    //{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    //{ path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    //{ path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
