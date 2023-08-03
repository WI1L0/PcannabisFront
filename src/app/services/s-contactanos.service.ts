import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from '../modelos/Noticias';
import baserUrl from './defauld/helper';
import { NoticiasResponse } from '../modelos/Respuestas/NoticiasResponse';
import { ContactanosResponse } from '../modelos/Respuestas/ContactanosResponse';
import { Contactanos } from '../modelos/Contactanos';

@Injectable({
    providedIn: 'root'
})
export class ScontactanosService {

    private URL = '/cbd/contactanos';

    constructor(private http: HttpClient) { }
  
    public postContactanos(contactanos: Contactanos, nombreEmpresa: String) {
      return this.http.post<Contactanos>(`${baserUrl + this.URL}/save/${nombreEmpresa}`, contactanos)
    }
  
    public deleteContactanos(idContactanos: number) {
      return this.http.delete<Noticias>(`${baserUrl + this.URL}/delete/${idContactanos}`)
    }

    //OBTENEMOS EL OBJETO EMPRESA
    public getContactanos(pageAct: number, estado: string, empresaName: string, busqueda: string) {
      // public getContactanos(pageAct: number, estado: string, empresaName: string) {
    if(busqueda == null || busqueda == ''){
      return this.http.get<ContactanosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}&estado=${estado}`);
    } else {
      return this.http.get<ContactanosResponse>(`${baserUrl + this.URL}/all/paginacion/busqueda/${empresaName}/${busqueda}/?pageNo=${pageAct}&estado=${estado}`);
    }
  }

  putContactanosEstado(id: number) {
    return this.http.get<Contactanos>(`${baserUrl + this.URL}/update/estado/${id}`)
  }

  putContactanosEstadoVistoOrNoVisto(id: number) {
    return this.http.get<Contactanos>(`${baserUrl + this.URL}/update/estadoVistoOrNoVisto/${id}`)
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