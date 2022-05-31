import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { AuthService } from './auth.service';
import { UserGateway } from './gateways/user.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private LOCATION_KEY = 'access_token';

    constructor(private _store: Store, private _auth: AuthService, private readonly _userGate : UserGateway) {}

    // get the owner data.
    get Me(): Observable<User> {
        return this._userGate.getMyProfile();
    }
    // get the owner id.
    get Id(): number {
        return this._auth.Token.userId;
    }

    /* fetchMe(): void {
        this._store.dispatch(loggedProfileFacade({ user_id: this._auth.Token.userId }));
        this._usersFacade.fetchMyProfile().subscribe(() => {});
    } */

    logout() {
        localStorage.removeItem(this.LOCATION_KEY);
    }
}
