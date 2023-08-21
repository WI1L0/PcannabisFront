import { Noticias } from "../Noticias";
import { Productos } from "../Productos";

export class ProductosResponse {
    contenido?: Productos[];
    numeroPagina?: number;
    medidaPagina?: number;
    totalElementos?: number;
    totalPagina?: number;
    ultima?: boolean;
}