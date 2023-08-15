import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FotosNoticias } from '../modelos/FotosNoticias';
import baserUrl from './defauld/helper';

@Injectable({
    providedIn: 'root'
})
export class SfotosNoticiasService {

    private URL = '/cbd/fotosNoticias';

    constructor(private http: HttpClient) { }
  
    //OBTENEMOS LA LISTA DE IMAGENES DE NOTICIAS
    public getImagenes(idNoticias: any) {
      return this.http.get<FotosNoticias[]>(`${baserUrl + this.URL}/noticia/${idNoticias}`);
    }

    // private URL = "http://localhost:8080//cbd/fotosNoticias/";

    // constructor(private http: HttpClient) { }

    // getFotosNoticias() {
    //     return this.http.get<FotosNoticias[]>(this.URL);
    // }

    postFotosNoticias(FotosNoticias: FotosNoticias, IDNoticia: number) {
        return this.http.post<FotosNoticias>(`${baserUrl + this.URL}/save/${IDNoticia}`, FotosNoticias)
    }

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