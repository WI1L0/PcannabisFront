import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../modelos/Empresas';
import { catchError, map, Observable, of } from 'rxjs';
import baserUrl from './defauld/helper';

@Injectable({
  providedIn: 'root',
})
export class SEmpresasService {

  private URL = '/cbd/empresas';

  constructor(private http: HttpClient) { }

  //OBTENEMOS EL OBJETO EMPRESA
  public getEmpresa(empresaName: string) {
    return this.http.get<Empresas>(`${baserUrl + this.URL}/name/${empresaName}`);
  }

  // public putEmpresa(empresaObject: Empresas): Observable<boolean>  {

  //   return this.http.put<Empresas>(`${baserUrl + this.URL}/update/${empresaObject.idEmpresa}`, empresaObject)
  //     .pipe(
  //       map(respuesta => {
  //         return true;
  //       }),
  //       catchError(error => {
  //         return of(false);
  //       })
  //     );
  // }

  
  public putEmpresa(empresaObject: Empresas) {
    return this.http.put<Empresas>(`${baserUrl + this.URL}/update/${empresaObject.idEmpresa}`, empresaObject)
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
