import { Beneficios } from "./Beneficios";
import { Noticias } from "./Noticias";
import { UsosAplicaciones } from "./UsosAplicaciones";
import {Empleados}from './Empleados';

export class Empresas {
    idEmpresas?: number;
    historia?: string;
    mision?: string;
    vision?: string;
    direccion?: string;
    valores?: string;
    longitud?: number;
    latitud?: number;
    estEmpresas?: boolean;
    usosAplicaciones?:UsosAplicaciones[]
    beneficios?: Beneficios[];
    noticias?: Noticias[];
    empleados?: Empleados[];

}
