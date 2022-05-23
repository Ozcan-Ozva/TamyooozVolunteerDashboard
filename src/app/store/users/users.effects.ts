// import { Injectable } from "@angular/core";
// import { createEffect, ofType } from "@ngrx/effects";
// import { Store } from "@ngrx/store";
// import { mergeMap, map, catchError, of } from "rxjs";
// import { User } from "../../model/user";
// import { IStore } from "../state";
// import * as UserActions from './users.actions';


// @Injectable()
// export class UserEffects {
//     getUser$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(UserActions.getUser),
//             mergeMap((action) => {
//                 return this.gatewayService.user.fetchOne(action.user_id).pipe(
//                     map((user) => {
//                         return UserActions.getUser_S({ user: new User(user) });
//                     }),
//                     catchError((error, caught) => {
//                         return of(
//                             UserActions.getUser_F({
//                                 error: error,
//                                 user_id: action.user_id,
//                             })
//                         );
//                     })
//                 );
//             })
//         )
//     );

//     getProfile$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(UserActions.getProfile),
//             mergeMap((action) => {
//                 return this.gatewayService.user.fetchMe().pipe(
//                     map((user) => {
//                         return UserActions.getProfile_S({
//                             user: new User(user),
//                         });
//                     }),
//                     catchError((error, caught) => {
//                         return of(
//                             UserActions.getProfile_F({
//                                 error: error,
//                                 user_id: action.user_id,
//                             })
//                         );
//                     })
//                 );
//             })
//         )
//     );
//     constructor(
//         private gatewayService: GatewayService,
//         private store: Store<IStore>,
//         private actions$: Actions,
//     ) {}
// }