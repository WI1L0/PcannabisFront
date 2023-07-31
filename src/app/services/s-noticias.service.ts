import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticias } from '../modelos/Noticias';
import baserUrl from './defauld/helper';
import { NoticiasResponse } from '../modelos/Respuestas/NoticiasResponse';

@Injectable({
  providedIn: 'root',
})
export class SnoticiasService {
  private URL = '/cbd/noticias';

  constructor(private http: HttpClient) {}

  // public getNoticiasId(idNoticia: number) {
  //   return this.http.get<Noticias>(`${baserUrl + this.URL}/id/${idNoticia}`);
  // }

  public postNoticias(noticia: Noticias, nombreEmpresa: String) {
    return this.http.post<Noticias>(`${baserUrl + this.URL}/save/${nombreEmpresa}`, noticia)
  }

  public putNoticias(noticia: Noticias, idNoticia: number) {
    return this.http.put<Noticias>(`${baserUrl + this.URL}/update/${idNoticia}`, noticia)
  }

  public deleteNoticias(idNoticia: number) {
    return this.http.delete<Noticias>(`${baserUrl + this.URL}/delete/${idNoticia}`)
  }

  public getNoticias(pageAct: number, estado: string, empresaName: string, busqueda: string) {
    if(busqueda == null || busqueda == ''){
      return this.http.get<NoticiasResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}&estado=${estado}`);
    } else {
      return this.http.get<NoticiasResponse>(`${baserUrl + this.URL}/all/paginacion/busqueda/${empresaName}/${busqueda}/?pageNo=${pageAct}&estado=${estado}`);
    }
  }

  putNoticiaEstado(id: number) {
    return this.http.get<Noticias>(`${baserUrl + this.URL}/update/estado/${id}`)
  }
}
