import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FotosNoticias } from '../modelos/FotosNoticias';
import baserUrl from './defauld/helper';
import { Fotos } from '../modelos/Fotos';

@Injectable({
    providedIn: 'root'
})
export class SfotosService {

    private URL = '/cbd/picture';

    constructor(private http: HttpClient) {}
    
    public postFotos(formData: FormData) {
        return this.http.post<Fotos>(`${baserUrl + this.URL}/save`, formData)
    }

    public deleteFotos(nameFile: string) {
        return this.http.delete<Boolean>(`${baserUrl + this.URL}/delete/${nameFile}`)
    }

    //OBTENER LAS IMAGENES
    // public getOneImagen(name: string) {
    //     return this.http.get(`${baserUrl + this.URL}/findOne/${name}`);
    // }

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