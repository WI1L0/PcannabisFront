import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../modelos/Roles';

@Injectable({
    providedIn: 'root'
})
export class roles {

    private URL = "http://localhost:8080//cbd/roles/";

    constructor(private http: HttpClient) { }

    getRoles() {
        return this.http.get<Roles[]>(this.URL);
    }

    postRoles(Roles: Roles) {
        return this.http.post<Roles>(this.URL, Roles);
    }

    putRoles(Roles: Roles, idRoles: any) {
        return this.http.put<Roles>(this.URL + `/${idRoles}`, Roles);
    }

    deleteRoles(idRoles: number) {
        return this.http.delete<boolean>(this.URL + `/${idRoles}`);
    }

    getPorId(idRoles: any) {
        return this.http.get<Roles>(this.URL + idRoles);
    }

}