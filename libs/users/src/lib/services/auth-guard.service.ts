import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastService } from '@nx-repo/ui';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalstorageService,
    private toastService: ToastService
  ) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userToken = this.localStorageService.getToken();

    if (userToken) {
      const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
      console.log('decoded userToken', decodedToken);

      if (decodedToken.isAdmin && !this._tokenExpired(decodedToken.exp)) {
        return true;
      } else {
        this.toastService.displayMessage(
          'Forbidden',
          'Only Administrators are allowed access to the dashboard.',
          'warn'
        );
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
