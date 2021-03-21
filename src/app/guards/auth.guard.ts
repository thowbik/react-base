import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { UserSessionService } from "../services/usersession.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private sessionService: UserSessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      // not logged in so redirect to login page with the return url
     // debugger;
      //this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      this.router.navigate(['/home']);
      return false;
    }

    // if (route.data.requiredPermission && !this.authService.hasRequiredPermission(route.data.requiredPermission)) {
    //   this.router.navigate(['/unauthorized']);
    //   return false;
    // }
    return true;
  }
  hasRequiredPermission(permission) {
    for (var i = 0; i < permission.length; i++) {
      if (permission[i] === this.sessionService.roleId())
        return true;
    }
    return false;
  };
}