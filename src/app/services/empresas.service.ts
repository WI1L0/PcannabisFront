import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresas } from '../modelos/Empresas';

@Injectable({
    providedIn: 'root'
})
export class empresasServices {

    private URL = "http://localhost:8080//cbd/empresas/";

    constructor(private http: HttpClient) { }

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

    getPorId(idEmpresas: any) {
        return this.http.get<Empresas>(this.URL + idEmpresas);
    }

}