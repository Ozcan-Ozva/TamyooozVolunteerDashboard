import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../model/admin';
import { User } from '../../model/user';
import { AdminGateway } from '../../services/gateways/admin.service';
import { UserGateway } from '../../services/gateways/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  id: number;
  private state: any;
  public shortName: string = "";
  public admin: User = {
    id: 0,
    name: " ",
    email: "",
    roles: [],
    created_at: new Date(),
  };
  public traitsValue : TraitValue[] = [];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private _adminGateway: AdminGateway, private _userGateway: UserGateway) { 
    console.log(this.router.getCurrentNavigation().extras.state);
    this.state = this.router.getCurrentNavigation().extras.state;
    this.id = this.state.id;
    if (this.state.type === 'Admin') {
      this.fetchAdmin()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.admin = {
          id: data.id,
          name: data.name,
          email: data.email,
          roles: [],
        };
        console.log("this is admin");
        console.log(this.admin);
        this.shortName = data.name.substring(0, data.name.indexOf(' '));
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    }
    else {
      this.fetchUser()
      .then((data) => {
        console.log("this is data");
        console.log(data);
        this.admin = data;
        console.log("this is admin");
        console.log(this.admin);
        this.shortName = data.name.substring(0, data.name.indexOf(' '));
        this.getTraitsValue();
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
    }
  }

  ngOnInit() {

    /* this.sub = this.route.params.subscribe(params => {
      console.log("this is params");
      console.log(params);
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
   }); */
  }

  private async fetchAdmin() {
    return this._adminGateway.getAdmin(this.id);
  }

  private async fetchUser() {
    return this._userGateway.getUser(this.id);
  }

  /* ngOnDestroy() {
    this.state.unsubscribe();
  } */

  getTraitsValue() {
    this.admin.personality.forEach(element => {
      element.traits.forEach(element => {
        let traitId = element.id;
        let traitValue = this.admin.traits_values.find((tv) => tv.trait_id === traitId);
        this.traitsValue.push({
          name: element.name,
          value: traitValue.value,
        })
      });
    });
  }

}

interface TraitValue {
  name: string;
  value: number;
}
