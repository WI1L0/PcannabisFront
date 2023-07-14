import { Contactanos } from "../Contactanos";

export class ContactanosResponse {
    contenido?: Contactanos[];
    numeroPagina?: number;
    medidaPagina?: number;
    totalElementos?: number;
    totalPagina?: number;
    ultima?: boolean;
}