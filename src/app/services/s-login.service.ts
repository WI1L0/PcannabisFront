import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './defauld/helper';
import { Login } from '../modelos/Login';
import { TokenResponse } from '../modelos/TokenResponse';

@Injectable({
    providedIn: 'root'
})
export class SloginService {

    private URL = '/cbd/auth';

    constructor(private http: HttpClient) { }

    //OBTENEMOS EL TOKEN
    public getTokenBack(LoginData: Login) {
        return this.http.post(`${baserUrl + this.URL}/inicioSeccion`, LoginData);
    }

    //ALMACENAR TOKEN Y ROLES EN LOCALSTORE
    public setTokenAndRoles(tokenResponse: TokenResponse) {
        localStorage.setItem('token', JSON.stringify(tokenResponse.tokenDeAcceso));
        localStorage.setItem('rolCliente', JSON.stringify(tokenResponse.roleCliente));
        localStorage.setItem('rolAdministrador', JSON.stringify(tokenResponse.roleAdministrador));
        localStorage.setItem('rolEmpleado', JSON.stringify(tokenResponse.roleEmpleado));
        localStorage.setItem('estActivo', JSON.stringify(tokenResponse.estActivo));
        localStorage.setItem('estBloqueado', JSON.stringify(tokenResponse.estBloqueado));

        return true;
    }

    // VERIFICAR SI ESTA LOGEEADO
    public estaLogin() {
        let tokenStr = localStorage.getItem('token');
        if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
            return false;
        } else {
            return true;
        }
    }

    //ELIMINAR TOKEN Y ROLES DEL LOGEEO
    public deleteTokenAndRoles() {
        localStorage.removeItem('token');
        localStorage.removeItem('rolCliente');
        localStorage.removeItem('rolAdministrador');
        localStorage.removeItem('rolEmpleado');
        localStorage.removeItem('estActivo');
        localStorage.removeItem('estBloqueado');

        return true;
    }

    //OBTENEMOS TOKEN
    public getToken() {
        return localStorage.getItem('token');
    }

    //OBTENEMOS ROLES
    public  getRoles(rol: string) {
        return String(localStorage.getItem(rol));
    }

}