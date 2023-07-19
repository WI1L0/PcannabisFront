import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from '../modelos/Noticias';
import baserUrl from './defauld/helper';
import { UsuariosResponse } from '../modelos/Respuestas/UsuariosResponse';
import { Personas } from '../modelos/Personas';

@Injectable({
    providedIn: 'root'
})
export class SpersonasService {

    private URL = '/cbd/personas';

    constructor(private http: HttpClient) { }
  
    //OBTENEMOS EL OBJETO DE USUARIOS Y PERSONAS
    public getOnePersona(id: number) {
      return this.http.get<Personas>(`${baserUrl + this.URL}/id/${id}`);
    }

    // postNoticias(Noticias: Noticias) {
    //     return this.http.post<Noticias>(this.URL, Noticias);
    // }

    // putNoticias(Noticias: Noticias, idNoticias: any) {
    //     return this.http.put<Noticias>(this.URL + `/${idNoticias}`, Noticias);
    // }

    // deleteNoticias(idNoticias: number) {
    //     return this.http.delete<boolean>(this.URL + `/${idNoticias}`);
    // }

    // getPorId(idNoticias: any) {
    //     return this.http.get<Noticias>(this.URL + idNoticias);
    // }

}