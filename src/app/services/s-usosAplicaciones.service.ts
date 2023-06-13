import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsosAplicaciones } from '../modelos/UsosAplicaciones';

@Injectable({
    providedIn: 'root'
})
export class usosAplicaciones {

    private URL = "http://localhost:8080//cbd/usosAplicaciones/";

    constructor(private http: HttpClient) { }

    getUsosAplicaciones() {
        return this.http.get<UsosAplicaciones[]>(this.URL);
    }

    postUsosAplicaciones(UsosAplicaciones: UsosAplicaciones) {
        return this.http.post<UsosAplicaciones>(this.URL, UsosAplicaciones);
    }

    putUsosAplicaciones(UsosAplicaciones: UsosAplicaciones, idUsosAplicaciones: any) {
        return this.http.put<UsosAplicaciones>(this.URL + `/${idUsosAplicaciones}`, UsosAplicaciones);
    }

    deleteUsosAplicaciones(idUsosAplicaciones: number) {
        return this.http.delete<boolean>(this.URL + `/${idUsosAplicaciones}`);
    }

    getPorId(idUsosAplicaciones: any) {
        return this.http.get<UsosAplicaciones>(this.URL + idUsosAplicaciones);
    }

}