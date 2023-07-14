import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from '../modelos/Noticias';
import baserUrl from './defauld/helper';
import { NoticiasResponse } from '../modelos/Respuestas/NoticiasResponse';
import { ContactanosResponse } from '../modelos/Respuestas/ContactanosResponse';

@Injectable({
    providedIn: 'root'
})
export class ScontactanosService {

    private URL = '/cbd/contactanos';

    constructor(private http: HttpClient) { }
  
    //OBTENEMOS EL OBJETO EMPRESA
    public getContactanos(pageAct: number, estado: string, empresaName: string) {
      return this.http.get<ContactanosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}&?estado=${estado}`);
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