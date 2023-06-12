import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from '../modelos/Noticias';

@Injectable({
    providedIn: 'root'
})
export class noticias {

    private URL = "http://localhost:8080//cbd/noticias/";

    constructor(private http: HttpClient) { }

    getNoticias() {
        return this.http.get<Noticias[]>(this.URL);
    }

    postNoticias(Noticias: Noticias) {
        return this.http.post<Noticias>(this.URL, Noticias);
    }

    putNoticias(Noticias: Noticias, idNoticias: any) {
        return this.http.put<Noticias>(this.URL + `/${idNoticias}`, Noticias);
    }

    deleteNoticias(idNoticias: number) {
        return this.http.delete<boolean>(this.URL + `/${idNoticias}`);
    }

    getPorId(idNoticias: any) {
        return this.http.get<Noticias>(this.URL + idNoticias);
    }

}