
import { CategoriaNoticias } from './CategoriaNoticias';
import {Empresas} from './Empresas';
import {FotosNoticias} from './FotosNoticias';

export class Noticias{
    idNoticias?: number;
    tituloNoticias?: string;
    descripcionNoticias?: string;
    fechaNoticias?: string;
    estNoticias?: boolean;
    empresas?: Empresas;
    categoriasNoticias?: CategoriaNoticias;
    fotosNoticias?: FotosNoticias[];
}