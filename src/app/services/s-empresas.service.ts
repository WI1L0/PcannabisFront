import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../modelos/Empresas';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SEmpresasService {
  private URL = 'http://localhost:8080/cbd/empresas/';

  constructor(private http: HttpClient) {}

  getEmpresas() {
    return this.http.get<Empresas[]>(this.URL);
  }

  postEmpresas(Empresas: Empresas) {
    return this.http.post<Empresas>(this.URL, Empresas);
  }

  putEmpresas(Empresas: Empresas, idEmpresas: any) {
    return this.http.put<Empresas>(this.URL + `/${idEmpresas}`, Empresas);
  }

  deleteEmpresas(idEmpresas: number) {
    return this.http.delete<boolean>(this.URL + `/${idEmpresas}`);
  }

  getPorName(nombreEmp: string): Observable<Empresas> {
    return this.http.get<Empresas>(this.URL + 'ByName/' + nombreEmp);
  }
}
