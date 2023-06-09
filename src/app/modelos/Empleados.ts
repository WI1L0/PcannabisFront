import {Usuarios} from './Usuarios'
import{Cargos}from './Cargos';
import { Empresas } from './Empresas';

export class Empleados {
    idEmpleados?: number;
    estEmpleados?: boolean;
    usuarios?: Usuarios;
    cargos?: Cargos;
    empresas?: Empresas;

}