import { Beneficios } from "./Beneficios";
import { Noticias } from "./Noticias";
import { UsosAplicaciones } from "./UsosAplicaciones";
import {Empleados}from './Empleados';

export class Empresas {
    idEmpresas?: number;
    nombreEmp?: string;
    historia?: string;
    mision?: string;
    vision?: string;
    direccion?: string;
    valor1?: { titulo: string, descripcion: string };
    valor2?: { titulo: string, descripcion: string };
    valor3?: { titulo: string, descripcion: string };
    valor4?: { titulo: string, descripcion: string };
    valor5?: { titulo: string, descripcion: string };
    valor6?: { titulo: string, descripcion: string };
    // valor1?: { titulo: string, descripcion: string } | "" = "";
    // valor2?: { titulo: string, descripcion: string } | "" = "";
    // valor3?: { titulo: string, descripcion: string } | "" = "";
    // valor4?: { titulo: string, descripcion: string } | "" = "";
    // valor5?: { titulo: string, descripcion: string } | "" = "";
    // valor6?: { titulo: string, descripcion: string } | "" = "";
    longitud?: number;
    latitud?: number;
    estEmpresas?: boolean;
    usosAplicaciones?:UsosAplicaciones[]
    beneficios?: Beneficios[];
    noticias?: Noticias[];
    empleados?: Empleados[];

}
