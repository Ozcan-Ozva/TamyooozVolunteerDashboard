import { createAction, props } from "@ngrx/store";
import { CustomError } from "../../model/custom-error";
import { User } from "../../model/user";


export const getUser = createAction('[User] Get User', props<{ user_id: number }>());
export const getUser_S = createAction('[User] Get User Success', props<{ user: User }>());
export const getUser_F = createAction('[User] Get User Failed', props<{ error: CustomError; user_id: number }>());

export const getProfile = createAction('[User] Get Profile', props<{ user_id: number }>());
export const getProfile_S = createAction('[User] Get Profile Success', props<{ user: User }>());
export const getProfile_F = createAction('[User] Get Profile Failed', props<{ error: CustomError; user_id: number }>());
