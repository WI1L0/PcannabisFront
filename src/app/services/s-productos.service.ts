import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticias } from '../modelos/Noticias';
import baserUrl from './defauld/helper';
import { NoticiasResponse } from '../modelos/Respuestas/NoticiasResponse';
import { Productos } from '../modelos/Productos';
import { ProductosResponse } from '../modelos/Respuestas/ProductosResponse';

@Injectable({
  providedIn: 'root',
})
export class SproductosService {
  private URL = '/cbd/productos';

  constructor(private http: HttpClient) {}

  public getProductosId(idProductos: number) {
    return this.http.get<Productos>(`${baserUrl + this.URL}/id/${idProductos}`);
  }

  public postProductos(produ: Productos, nombreEmpresa: String) {
    return this.http.post<Productos>(`${baserUrl + this.URL}/save/${nombreEmpresa}`, produ)
  }

  public putProductos(produ: Productos, idProductos: number) {
    return this.http.put<Productos>(`${baserUrl + this.URL}/update/${idProductos}`, produ)
  }

  public deleteProductos(idProductos: number) {
    return this.http.delete<Productos>(`${baserUrl + this.URL}/delete/${idProductos}`)
  }

  public getProductos(pageAct: number, estado: string, empresaName: string, busqueda: string) {
    if(busqueda == null || busqueda == ''){
      return this.http.get<ProductosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}&estado=${estado}`);
    } else {
      return this.http.get<ProductosResponse>(`${baserUrl + this.URL}/all/paginacion/busqueda/${empresaName}/${busqueda}/?pageNo=${pageAct}&estado=${estado}`);
    }
  }

  putProductosEstado(id: number) {
    return this.http.get<Productos>(`${baserUrl + this.URL}/update/estado/${id}`)
  }
}
