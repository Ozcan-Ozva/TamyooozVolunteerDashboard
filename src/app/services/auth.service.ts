import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TypesUtils } from '../shared/utils';
import { API } from './api.service';

@Injectable()
export class AuthService {
    private LOCATION_KEY = 'access_token';

    constructor(private api: API) {}

    checkEmail(email: string): Promise<boolean> {
        return this.api
            .get<{ isExisting: boolean }>(`users/checkExistingEmail?email=${email}`, {})
            .toPromise()
            .then(({ isExisting }) => isExisting);
    }

    signIn(email: string, password: string) {
        return this.api
            .post<any>('login', {}, { email, password })
            .toPromise()
            .then((data) => {
                this.Token = data.data.admin.access_token;
                return data;
            });
    }

    signUp(input: SignUpInput): void {
        let response = this.api.post('users/signUp', {}, { data: input }).toPromise();
        response
            .then(() => this.signIn(input.email, input.password))
            .then(() => {
                return this.initialize().toPromise();
            })
            .catch(() => console.log('failed login'));
    }

    initialize(): Observable<void> {
        return this.api.post<void>('accounts/initAccount', {}, {});
    }

    /**
     * @todo
     */
    get isExpired(): boolean {
        let token = this.Token;
        return /* Check is Expired */;
    }

    get isAuthenticated(): boolean {
        if (!this.Token) return false;
        if (this.isExpired) return false;
        return true;
    }

    get Token(): TokenPayload | null {
        try {
            return JSON.parse(localStorage.getItem(this.LOCATION_KEY)) as TokenPayload;
        } catch (error) {
            return null;
        }
    }

    set Token(token: TokenPayload) {
        /* Confirm Token Validity */
        localStorage.setItem(this.LOCATION_KEY, JSON.stringify(token));
    }
}

export type SignUpInput = {
    name: string;
    gender: TypesUtils.Gender;
    imageId: number;
    email: string;
    username: string;
    password: string;
    jobCategoryId: number;
    jobSubCategoryId: number;
};

export type TokenPayload = {
    id: string;
    ttl: number;
    created: Date;
    userId: number;
    principalType: string /* FIX */;
};
