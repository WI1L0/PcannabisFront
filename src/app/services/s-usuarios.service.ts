import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './defauld/helper';
import { UsuariosResponse } from '../modelos/Respuestas/UsuariosResponse';
import { Usuarios } from '../modelos/Usuarios';

@Injectable({
    providedIn: 'root'
})
export class SusuariosService {

    private URL = '/cbd/usuarios';

    constructor(private http: HttpClient) { }
  
    //OBTENEMOS EL OBJETO DE USUARIOS Y PERSONAS
    public getUsuariosPersonas(pageAct: number, empresaName: string) {
      return this.http.get<UsuariosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}`);
    }

    public getOneUsuario(id: number) {
      return this.http.get<Usuarios>(`${baserUrl + this.URL}/id/${id}`);
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