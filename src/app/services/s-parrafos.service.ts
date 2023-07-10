import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../modelos/Empresas';
import { map, Observable } from 'rxjs';
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

  // postEmpresas(Empresas: Empresas) {
  //   return this.http.post<Empresas>(this.URL, Empresas);
  // }

  // putEmpresas(Empresas: Empresas, idEmpresas: any) {
  //   return this.http.put<Empresas>(this.URL + `/${idEmpresas}`, Empresas);
  // }

  // deleteEmpresas(idEmpresas: number) {
  //   return this.http.delete<boolean>(this.URL + `/${idEmpresas}`);
  // }

  // getPorName(nombreEmp: string): Observable<Empresas> {
  //   return this.http.get<Empresas>(this.URL + 'ByName/' + nombreEmp);
  // }
}
