import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import jwt_decode from "jwt-decode"

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // Comprobar que existe sesion abierta
      if (this.auth.getSession() !== null) {
        console.log('Sesion iniciada');
        const dataDecode = this.decodeToken();
        console.log(dataDecode);
        // Comprobar caducidad del Token
        if (dataDecode.exp < new Date().getTime() / 1000) {
          console.log('Sesión caducada');
          return this.redirect();
        }
        // El role del usuario es Admin
        if (dataDecode.user.role === 'ADMIN') {
          console.log('Admin');
          return true;
        }
        console.log('No admin');
      }
      return this.redirect();
  }

  redirect() {
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken() {
    return jwt_decode(this.auth.getSession().token);
  }
}
