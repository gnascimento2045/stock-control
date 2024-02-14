import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private userService: UserService,
    private router: Router,) { }

    canActivate():
      Observable<boolean | UrlTree>
    | Promise<boolean
    | UrlTree>
    | boolean
    | UrlTree{

      if (!this.userService.isLoggeIn()) {
        this.router.navigate(['/home']);
        return false;
      }

      this.userService.isLoggeIn();
      return true;

     }
}
