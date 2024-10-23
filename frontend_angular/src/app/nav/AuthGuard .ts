import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendServices } from '../feature/BackendServices'; // Adjust the path according to your actual service location

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private backendService: BackendServices, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.backendService.isLoggedIn()) {
        return true;
      } else {
        // If user is not logged in, you can redirect them to the login page or just return true to allow access
        this.router.navigate(['/login']);
        return false;
      }
  }
}
