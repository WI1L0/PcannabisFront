import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargos } from '../modelos/Cargos';

@Injectable({
    providedIn: 'root'
})
export class cargos {

    private URL = "http://localhost:8080//cbd/cargos/";

    constructor(private http: HttpClient) { }

    getCargos() {
        return this.http.get<Cargos[]>(this.URL);
    }

    postCargos(Cargos: Cargos) {
        return this.http.post<Cargos>(this.URL, Cargos);
    }

    putCargos(Cargos: Cargos, idCargos: any) {
        return this.http.put<Cargos>(this.URL + `/${idCargos}`, Cargos);
    }

    deleteCargos(idCargos: number) {
        return this.http.delete<boolean>(this.URL + `/${idCargos}`);
    }

    getPorId(idCargos: any) {
        return this.http.get<Cargos>(this.URL + idCargos);
    }

}