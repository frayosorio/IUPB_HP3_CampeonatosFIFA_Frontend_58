import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Campeonato } from '../../shared/entidades/campeonato';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}campeonatos/`;
  }

  public listar(): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.url}listar`);
  }

  public buscar(opcion: number, dato: string): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(`${this.url}agregar`, campeonato);
  }

  public modificar(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.url}modificar`, campeonato);
  }

  public eliminar(idCampeonato: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${idCampeonato}`);
  }
  
}
