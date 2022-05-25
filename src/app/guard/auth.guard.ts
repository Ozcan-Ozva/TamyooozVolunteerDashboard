import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }

    canLoad(route: Route, urlSegments: UrlSegment[]): boolean {
        if (this.authService.isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }
}
