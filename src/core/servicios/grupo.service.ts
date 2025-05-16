import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../../shared/entidades/grupo';
import { Observable } from 'rxjs';
import { GrupoPais } from '../../shared/entidades/grupopais';
import { environment } from '../../environments/environment';
import { TablaPosicionesDto } from '../../shared/dtos/posiciones';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {


  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}grupos/`;
  }

  public listar(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}listar`);
  }

  public listarCampeonato(idCampeonato: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}listarcampeonato/${idCampeonato}`);
  }

  public buscar(dato: String): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}buscar/${dato}`);
  }

  public agregar(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.url}agregar`, grupo);
  }

  public modificar(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.url}modificar`, grupo);
  }

  public eliminar(idGrupo: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${idGrupo}`);
  }

  // ***** Paises del Grupo *****

  public listarPaises(idGrupo: number): Observable<GrupoPais[]> {
    return this.http.get<GrupoPais[]>(`${this.url}listarpaises/${idGrupo}`);
  }

  public agregarPais(grupoPais: GrupoPais): Observable<GrupoPais> {
    return this.http.post<GrupoPais>(`${this.url}agregarpais`, grupoPais);
  }

  public modificarPais(grupoPais: GrupoPais): Observable<GrupoPais> {
    return this.http.put<GrupoPais>(`${this.url}modificarpais`, grupoPais);
  }

  public eliminarPais(idGrupo: number, idPais: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminarpais/${idGrupo}/${idPais}`);
  }

  // ***** Tabla de Posiciones *****

  public listarTablaPosiciones(idGrupo: number): Observable<TablaPosicionesDto[]> {
    return this.http.get<TablaPosicionesDto[]>(`${this.url}posiciones/${idGrupo}`);
  }


}
