import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../modelos/Empresas';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private URL = "http://localhost:8080//cbd/empresas/";

  constructor() { }

}
