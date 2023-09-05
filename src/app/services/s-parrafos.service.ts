import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../modelos/Empresas';
import { catchError, map, mapTo, Observable, throwError } from 'rxjs';
import baserUrl from './defauld/helper';
import { Parrafos } from '../modelos/Parrafos';

@Injectable({
  providedIn: 'root',
})
export class SParrafosService {

  private URL = '/cbd/parrafos';

  constructor(private http: HttpClient) { }

  //OBTENEMOS LA LISTA DE PARRAFOS
  public getParrafos(idNoticias: any) {
    return this.http.get<Parrafos[]>(`${baserUrl + this.URL}/noticia/${idNoticias}`);
  }


  // getEmpresas() {
  //   return this.http.get<Empresas[]>(this.URL);
  // }

  // postParrafos(parrafos: Parrafos): Observable<Parrafos> {
  //   const url = `${baserUrl}${this.URL}/save/`;
  //   return this.http.post<Parrafos>(url, parrafos);
  // }


  public postParrafo(parrafos: Parrafos, IDNoticia: number) {
    return this.http.post<Parrafos>(`${baserUrl + this.URL}/save/${IDNoticia}`, parrafos)
  }

  public putParrafo(parrafos: Parrafos, id: number) {
    return this.http.put<Parrafos>(`${baserUrl + this.URL}/update/${id}`, parrafos)
  }

  public deleteParrafos(idParrafo: number) {
    return this.http.delete<Boolean>(`${baserUrl + this.URL}/definitivo/${idParrafo}`)
  }

  // deleteEmpresas(idEmpresas: number) {
  //   return this.http.delete<boolean>(this.URL + `/${idEmpresas}`);
  // }

  // getPorName(nombreEmp: string): Observable<Empresas> {
  //   return this.http.get<Empresas>(this.URL + 'ByName/' + nombreEmp);
  // }
}
