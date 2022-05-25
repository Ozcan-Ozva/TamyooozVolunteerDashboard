import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivateChild {
    private LOCATION_KEY = 'access_token';

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['../'], { relativeTo: this.route });
            return false;
        }
    }
}
