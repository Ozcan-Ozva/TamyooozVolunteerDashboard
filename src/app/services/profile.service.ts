// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { loggedProfileFacade } from '@store/user/user.actions';
// import { selectOneUser } from '@store/user/user.selectors';
// import { UserEntity } from '@store/user/user.state';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { AuthService } from './auth.service';
// import { UsersFacade } from './facade/Users/users-facade.service';

// @Injectable({ providedIn: 'root' })
// export class ProfileService {
//     private LOCATION_KEY = 'access_token';

//     constructor(private _store: Store, private _auth: AuthService, private readonly _usersFacade: UsersFacade) {}

//     // get the owner data.
//     get Me(): Observable<UserEntity> {
//         return this._store.select(selectOneUser, { user_id: this._auth.Token.userId }).pipe(map(({ user }) => user));
//     }
//     // get the owner id.
//     get Id(): number {
//         return this._auth.Token.userId;
//     }

//     fetchMe(): void {
//         this._store.dispatch(loggedProfileFacade({ user_id: this._auth.Token.userId }));
//         this._usersFacade.fetchMyProfile().subscribe(() => {});
//     }

//     logout() {
//         localStorage.removeItem(this.LOCATION_KEY);
//     }
// }
