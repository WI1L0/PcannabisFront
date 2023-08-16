import { FotosEmpresas } from "../FotosEmpresas";
import { Personas } from "../Personas";
import { Usuarios } from "../Usuarios";

export class FotosEmpresasResponse {
    contenidoFotosEmpresas?: FotosEmpresas[];
    numeroPagina?: number;
    medidaPagina?: number;
    totalElementos?: number;
    totalPagina?: number;
    ultima?: boolean;
}