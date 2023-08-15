import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './defauld/helper';
import { UsuariosResponse } from '../modelos/Respuestas/UsuariosResponse';
import { Usuarios } from '../modelos/Usuarios';
import { Roles } from '../modelos/Roles';

@Injectable({
    providedIn: 'root'
})
export class SusuariosService {

    private URL = '/cbd/usuarios';

    constructor(private http: HttpClient) { }

    public getUsuarios(pageAct: number, estado: string, empresaName: string, busqueda: string) {
      if(busqueda == null || busqueda == ''){
        return this.http.get<UsuariosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}&estado=${estado}`);
      } else {
        return this.http.get<UsuariosResponse>(`${baserUrl + this.URL}/all/paginacion/busqueda/${empresaName}/${busqueda}/?pageNo=${pageAct}&estado=${estado}`);
      }
    }
  
    //OBTENEMOS EL OBJETO DE USUARIOS Y PERSONAS
    public getUsuariosPersonas(pageAct: number, empresaName: string) {
      return this.http.get<UsuariosResponse>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/?pageNo=${pageAct}`);
    }

    public getOneUsuario(id: number) {
      return this.http.get<Usuarios>(`${baserUrl + this.URL}/id/${id}`);
    }

    public deleteUsuarios(idUsuarios: number) {
      return this.http.delete<Usuarios>(`${baserUrl + this.URL}/delete/${idUsuarios}`)
    }

    putUsuariosEstadoBloqueado(id: number) {
      return this.http.get<Usuarios>(`${baserUrl + this.URL}/blocOrNoBloc/${id}`)
    }

    guardarUsuarios(idPersona: number, nombreRol: string, nombreEmpresa: string, usuario: Usuarios) {
      return this.http.post<Usuarios>(`${baserUrl + this.URL}/save/persona/${idPersona}/rol/${nombreRol}/empresa/${nombreEmpresa}`, usuario);
    }
    
    public putUsuario(usuarioObject: Usuarios, nombreRol: string){
      return this.http.put<Usuarios>(`${baserUrl + this.URL}/update/${usuarioObject.idUsuario}/rol/${nombreRol}/`, usuarioObject)
    }
      
    public getObtenerRolUsuario(id: number) {
      return this.http.get<Roles>(`${baserUrl + this.URL}/obtenerRolUsuario/${id}`);
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