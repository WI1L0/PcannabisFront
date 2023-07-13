import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from '../modelos/Noticias';
import baserUrl from './defauld/helper';
import { UsuariosResponse } from '../modelos/Respuestas/UsuariosResponse';

@Injectable({
    providedIn: 'root'
})
export class SusuariosService {

    private URL = '/cbd/usuarios';

    constructor(private http: HttpClient) { }
  
    //OBTENEMOS EL OBJETO DE USUARIOS Y PERSONAS
    public getUsuariosPersonas(pageAct: number, estado: string, empresaName: string) {
      return this.http.get<UsuariosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}&?estado=${estado}`);
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