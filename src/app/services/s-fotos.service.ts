import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FotosNoticias } from '../modelos/FotosNoticias';
import baserUrl from './defauld/helper';

@Injectable({
    providedIn: 'root'
})
export class SfotosService {

<<<<<<< Updated upstream
    private URL = '/cbd/picture';

    constructor(private http: HttpClient) { }

    //OBTENER LAS IMAGENES
    // public getOneImagen(name: string) {
    //     return this.http.get(`${baserUrl + this.URL}/findOne/${name}`);
    // }
=======
    constructor(private http: HttpClient) { }

    //OBTENER LAS IMAGENES
    public getAllByCategoria(name: string) {
        return this.http.get(`${baserUrl}/cbd/fotosEmpresas/categoria/${name}`);
    }
>>>>>>> Stashed changes

    // postFotosNoticias(FotosNoticias: FotosNoticias) {
    //     return this.http.post<FotosNoticias>(this.URL, FotosNoticias);
    // }

    // putFotosNoticias(FotosNoticias: FotosNoticias, idFotosNoticias: any) {
    //     return this.http.put<FotosNoticias>(this.URL + `/${idFotosNoticias}`, FotosNoticias);
    // }

    // deleteFotosNoticias(idFotosNoticias: number) {
    //     return this.http.delete<boolean>(this.URL + `/${idFotosNoticias}`);
    // }

    // getPorId(idFotosNoticias: any) {
    //     return this.http.get<FotosNoticias>(this.URL + idFotosNoticias);
    // }

}