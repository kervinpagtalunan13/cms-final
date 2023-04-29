import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, 
              private router: Router,
    ){
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Observable(obs => {
      this.authService.getCurrentUser()
        .subscribe({
          next: data => {
            if(!data){
              obs.next(true)
              this.router.navigate(['/', 'login'])
            }
            obs.next(false)
            this.router.navigate(['/', 'dashboard'])
          },
          
          error: err => {
            this.router.navigate(['/', 'login'])
            obs.next(false)
          }
        })
    })  

  }
  
}
