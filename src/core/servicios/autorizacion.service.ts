import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private readonly TOKEN_KEY = 'token';

  constructor() { }

  cerrarSesion(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    //localStorage.removeItem('usuarioActual');
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  eliminarToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }
}
