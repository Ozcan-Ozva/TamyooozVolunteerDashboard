import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class API {
    private readonly access_token = JSON.parse(localStorage.getItem('access_token'));
    private domain_url: string;
    private headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access_token}`
      })

    constructor(private readonly http: HttpClient) {
        const base_url = JSON.parse(localStorage.getItem("base-url"));
        this.domain_url = environment.base_url;

        if (base_url && base_url !== "") {
            this.domain_url = base_url;
        }
    }

    get<T>(
        url: string,
        variables: Object,
        filter?: {},
        where?: Object,
        queryParmas?: Object,
        changeRoute?: boolean
    ): Observable<T> {
        url = this.createUrlString(
            url,
            variables,
            filter,
            where,
            queryParmas,
            changeRoute
        );
        console.log(filter);
        return this.http.get<T>(url, {headers: this.headers, params: filter });
    }

    post<T>(
        url: string,
        variables: Object,
        data: Object,
        include?: string
    ): Observable<T> {
        url = this.createUrlString(
            url,
            variables,
            null,
            null,
            null,
            false,
            include
        );
        return this.http.post<T>(url, data, {headers: this.headers});
    }

    put<T>(url: string, variables: Object, data: Object): Observable<T> {
        url = this.createUrlString(url, variables, null, null, null, false);
        return this.http.put<T>(url, data, {headers: this.headers});
    }

    patch<T>(url: string, variables: Object, data: Object): Observable<T> {
        url = this.createUrlString(url, variables, null, null, null, false);
        return this.http.patch<T>(url, data, {headers: this.headers});
    }

    delete<T>(url: string, variables: Object): Observable<T> {
        url = this.createUrlString(url, variables, null, null, null, false);
        return this.http.delete<T>(url, {headers: this.headers});
    }

    private createUrlString(
        url: string,
        variables?: Object,
        filter?: any,
        where?: any,
        queryParmas?: Object,
        changeRoute?: boolean,
        include?: string
    ): string {
        for (var variableKey in variables) {
            url = url.replace(
                new RegExp('{{' + variableKey + '}}', 'g'),
                variables[variableKey]
            );
        }

        if (filter || where || queryParmas || include) {
            url += '?';
        }
        if (filter && Object.keys(filter).length > 0) {
            url += `filter=${JSON.stringify(filter)}&`;
        }
        if (where) {
            url += `where=${JSON.stringify(where)}&`;
        }
        if (queryParmas) {
            for (const key in queryParmas) {
                if (queryParmas.hasOwnProperty(key)) {
                    const element = queryParmas[key];
                    url += key + '=' + element + '&';
                }
            }
        }
        if (include) {
            url += `include=${include}&`;
        }
        url = encodeURI(url);
        return [this.domain_url, url].join('');
    }
}
