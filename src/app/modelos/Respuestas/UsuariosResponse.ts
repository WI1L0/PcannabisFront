import { Personas } from "../Personas";
import { Usuarios } from "../Usuarios";

export class UsuariosResponse {
    contenidoUsuarios?: Usuarios[];
    contenidoPersonas?: Personas[];
    numeroPagina?: number;
    medidaPagina?: number;
    totalElementos?: number;
    totalPagina?: number;
    ultima?: boolean;
}