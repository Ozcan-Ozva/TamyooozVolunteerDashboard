import { UserGateway } from './../services/gateways/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileResolver implements Resolve<any> {
    constructor(/* private profile: ProfileService */ private _userGateway: UserGateway) {}

    /* resolve(): Promise<void> {
        //this.profile.fetchMe();
        // this.profile.fetchUserFriends();
        return this.profile.Me.then((data) => {
          console.log("this is event");
          console.log(data);
        })
        .catch((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) alert("Wrong Password");
          }
        });
    } */

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
      console.log('Called Get My Profile in resolver...', route);
      return this._userGateway.getMyProfile().pipe(
        catchError(error => {
          return of('No data');
        })
      );
    }
}
