import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FotosNoticias } from '../modelos/FotosNoticias';
import baserUrl from './defauld/helper';
import { FotosEmpresas } from '../modelos/FotosEmpresas';
import { FotosEmpresasResponse } from '../modelos/Respuestas/FotosEmpresasResponse';

@Injectable({
    providedIn: 'root'
})
export class SfotosEmpresasService {

    private URL = '/cbd/fotosEmpresas';

    constructor(private http: HttpClient) { }

    //OBTENEMOS LA LISTA DE IMAGENES DE Empresas
    public getFotosEmpresas(categoria: string, empresaName: string) {
        return this.http.get<FotosEmpresas[]>(`${baserUrl + this.URL}/all/paginacion/${empresaName}/${categoria}/`);
    }

    public deleteFotosEmpresas(idFtEmpresas: number) {
        return this.http.delete<Boolean>(`${baserUrl + this.URL}/Definitivo/${idFtEmpresas}`);
    }

    public saveFotosEmpresas(ftEmpresas: FotosEmpresas, empres: string) {
        return this.http.post<FotosEmpresas>(`${baserUrl + this.URL}/save/${empres}/`, ftEmpresas);
    }

}