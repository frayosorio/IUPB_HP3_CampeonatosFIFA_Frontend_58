import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioDto } from '../../shared/dtos/usuario-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}usuarios/`;
  }

  public iniciarSesion(usuario: string, password: string): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.url}login/${usuario}/${password}`);
  }
}
