import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleados } from '../modelos/Empleados';

@Injectable({
    providedIn: 'root'
})
export class empleados {

    private URL = "http://localhost:8080//cbd/empleados/";

    constructor(private http: HttpClient) { }

    getEmpleados() {
        return this.http.get<Empleados[]>(this.URL);
    }

    postEmpleados(Empleados: Empleados) {
        return this.http.post<Empleados>(this.URL, Empleados);
    }

    putEmpleados(Empleados: Empleados, idEmpleados: any) {
        return this.http.put<Empleados>(this.URL + `/${idEmpleados}`, Empleados);
    }

    deleteEmpleados(idEmpleados: number) {
        return this.http.delete<boolean>(this.URL + `/${idEmpleados}`);
    }

    getPorId(idEmpleados: any) {
        return this.http.get<Empleados>(this.URL + idEmpleados);
    }

}