import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../../model/admin';
import { AdminGateway } from '../../services/gateways/admin.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  id: number;
  private sub: any;
  public shortName: string = "";
  public admin: Admin = {
    id: 0,
    name: " ",
    email: "",
    roles: [],
    created_at: new Date(),
  };

  constructor(private route: ActivatedRoute, private _adminGateway: AdminGateway) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchAdmin()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.admin = data;
        console.log("this is admin");
        console.log(this.admin);
        this.shortName = data.name.substring(0, data.name.indexOf(' '));
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
   });
  }

  private async fetchAdmin() {
    return this._adminGateway.getAdmin(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
