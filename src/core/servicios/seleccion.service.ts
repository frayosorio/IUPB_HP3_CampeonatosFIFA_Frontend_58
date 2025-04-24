import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seleccion } from '../../shared/entidades/Seleccion';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}selecciones/`;
  }

  public listar(): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}listar`);
  }

  public buscar(opcion:number, dato:string): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.post<Seleccion>(`${this.url}agregar`, seleccion);
  }

}
