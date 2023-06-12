import {Empleados} from './Empleados';
import {Roles} from './Roles';
export class Usuarios{
    idUsuarios?: number;
    nombreUsuarios?:string;
    passwordUsuarios?:string;
    fotoUsuarios?:string;
    estUsuarios?:boolean;
    empleados?:Empleados;
    roles?:Roles[]
}