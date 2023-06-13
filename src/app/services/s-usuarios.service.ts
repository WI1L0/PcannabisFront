import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../modelos/Usuarios';

@Injectable({
    providedIn: 'root'
})
export class usuarios {

    private URL = "http://localhost:8080//cbd/usuarios/";

    constructor(private http: HttpClient) { }

    getUsuarios() {
        return this.http.get<Usuarios[]>(this.URL);
    }

    postUsuarios(Usuarios: Usuarios) {
        return this.http.post<Usuarios>(this.URL, Usuarios);
    }

    putUsuarios(Usuarios: Usuarios, idUsuarios: any) {
        return this.http.put<Usuarios>(this.URL + `/${idUsuarios}`, Usuarios);
    }

    deleteUsuarios(idUsuarios: number) {
        return this.http.delete<boolean>(this.URL + `/${idUsuarios}`);
    }

    getPorId(idUsuarios: any) {
        return this.http.get<Usuarios>(this.URL + idUsuarios);
    }

}