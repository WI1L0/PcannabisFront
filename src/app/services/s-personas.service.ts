import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from '../modelos/Personas';

@Injectable({
    providedIn: 'root'
})
export class personas {

    private URL = "http://localhost:8080//cbd/personas/";

    constructor(private http: HttpClient) { }

    getPersonas() {
        return this.http.get<Personas[]>(this.URL);
    }

    postPersonas(Personas: Personas) {
        return this.http.post<Personas>(this.URL, Personas);
    }

    putPersonas(Personas: Personas, idPersonas: any) {
        return this.http.put<Personas>(this.URL + `/${idPersonas}`, Personas);
    }

    deletePersonas(idPersonas: number) {
        return this.http.delete<boolean>(this.URL + `/${idPersonas}`);
    }

    getPorId(idPersonas: any) {
        return this.http.get<Personas>(this.URL + idPersonas);
    }

}