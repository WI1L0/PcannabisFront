import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaNoticias } from '../modelos/CategoriaNoticias';

@Injectable({
  providedIn: 'root'
})
  export class categoriaNoticias {

    private URL = "http://localhost:8080//cbd/CategoriaNoticias/";
    
  constructor(private http: HttpClient) { }

  getCategoriaNoticias() {
    return this.http.get<CategoriaNoticias[]>(this.URL);
  }

  postCategoriaNoticias(CategoriaNoticias: CategoriaNoticias) {
    return this.http.post<CategoriaNoticias>(this.URL, CategoriaNoticias);
  }

  putCategoriaNoticias(CategoriaNoticias: CategoriaNoticias, idCategoriaNoticias: any) {
    return this.http.put<CategoriaNoticias>(this.URL + `/${idCategoriaNoticias}`, CategoriaNoticias);
  }

  deleteCategoriaNoticias(idCategoriaNoticias: number) {
    return this.http.delete<boolean>(this.URL + `/${idCategoriaNoticias}`);
  }

  getPorId(idCategoriaNoticias: any) {
    return this.http.get<CategoriaNoticias>(this.URL + idCategoriaNoticias);
  }

  }