import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class AuthguardService implements CanActivate {

  constructor(private router:Router, private authService: UserService ) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|UrlTree {

if (!this.authService.loggedIn) {
alert('You are not allowed to view this page. You are redirected to login Page');

this.router.navigate(['rutas'], { queryParams: { retUrl: route.url} });
return false;

//var urlTree = this.router.createUrlTree(['login']);
//return urlTree;
}

return true;
}


}
