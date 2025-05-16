import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Encuentro } from '../../shared/entidades/encuentro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuentroService {


  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}encuentros/`;
  }

  public listarCampeonato(idCampeonato: number): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(`${this.url}listarcampeonato/${idCampeonato}`);
  }

  public listarCampeonatoFase(idCampeonato: number, idFase: number): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(`${this.url}listarcampeonatofase/${idCampeonato}/${idFase}`);
  }

  public listarGrupo(idGrupo: number): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(`${this.url}listargrupo/${idGrupo}`);
  }

  public buscar(opcion: number, dato: String): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(encuentro: Encuentro): Observable<Encuentro> {
    return this.http.post<Encuentro>(`${this.url}agregar`, encuentro);
  }

  public modificar(encuentro: Encuentro): Observable<Encuentro> {
    return this.http.put<Encuentro>(`${this.url}modificar`, encuentro);
  }

  public eliminar(idEncuentro: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${idEncuentro}`);
  }
  

}
