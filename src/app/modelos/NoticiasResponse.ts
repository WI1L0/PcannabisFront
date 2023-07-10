import { Noticias } from "./Noticias";

export class NoticiasResponse {
    contenido?: Noticias[];
    numeroPagina?: number;
    medidaPagina?: number;
    totalElementos?: number;
    totalPagina?: number;
    ultima?: boolean;
}