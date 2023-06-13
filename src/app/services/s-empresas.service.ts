import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../modelos/Empresas';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SEmpresasService {

  private URL = "http://localhost:8080//cbd/empresas/";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEmpresas():Observable<Empresas[]> {
    console.log("Ingresa");
    console.log(this.http.get<Empresas[]>(this.URL).pipe(map(Response => Response as Empresas[])));
    return this.http.get<Empresas[]>(this.URL).pipe(map(Response => Response as Empresas[]));
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

getPorId(idEmpresas: any) {
    return this.http.get<Empresas>(this.URL + idEmpresas);
}

}
