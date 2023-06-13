import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficios } from '../modelos/Beneficios';

@Injectable({
    providedIn: 'root'
})
export class beneficios {

    private URL = "http://localhost:8080//cbd/beneficios/";

    constructor(private http: HttpClient) { }

    getBeneficios() {
        return this.http.get<Beneficios[]>(this.URL);
    }

    postBeneficios(beneficios: Beneficios) {
        return this.http.post<Beneficios>(this.URL, beneficios);
    }

    putBeneficios(beneficios: Beneficios, idBeneficios: any) {
        return this.http.put<Beneficios>(this.URL + `/${idBeneficios}`, beneficios);
    }

    deleteBeneficios(idBeneficios: number) {
        return this.http.delete<boolean>(this.URL + `/${idBeneficios}`);
    }

    getPorId(idBeneficios: any) {
        return this.http.get<Beneficios>(this.URL + idBeneficios);
    }

}