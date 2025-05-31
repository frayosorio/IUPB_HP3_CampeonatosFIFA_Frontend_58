import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AutorizacionService } from '../servicios/autorizacion.service';
import { RUTA_DEFAULT } from '../../app/app.routes';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {

  constructor(private autorizacionServicio: AutorizacionService,
    private router: Router) {
  }

  canActivate(): boolean {
    const token = this.autorizacionServicio.obtenerToken();

    if (token && !this.tokenExpirado(token)) {
      return true;
    }
    else {
      this.router.navigate([RUTA_DEFAULT]);
      return false;
    }
  }

  private tokenExpirado(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      return true; // si hay error, consideramos el token inválido
    }
  }

}

