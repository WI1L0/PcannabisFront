import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FotosEmpresas } from 'src/app/modelos/FotosEmpresas';
import { FotosEmpresasResponse } from 'src/app/modelos/Respuestas/FotosEmpresasResponse';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosEmpresasService } from 'src/app/services/s-fotosEmpresas.service';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-fotos-galerias',
  templateUrl: './fotos-galerias.component.html',
  styleUrls: ['./fotos-galerias.component.scss']
})
export class FotosGaleriasComponent implements OnInit {

  FotosEmpresasList: FotosEmpresas[] = [];
  // listFotosEmpresa: FotosEmpresasResponse = new FotosEmpresasResponse();

  // CUERPO DE LA URL IMAGENES
  cuerpoUrlFoto: string = baserUrlImagenes;

  constructor(
    private loginServices: SloginService,
    private router: Router,
    private fotosEmpresasServices: SfotosEmpresasService
  ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }

    this.obtenerFotos();

  }

  // MOSTRAR FOTOS
  obtenerFotos() {
    this.limpiarAll();
    this.fotosEmpresasServices.getFotosEmpresas(nameEmpresa, "instalaciones").subscribe(
      (data) => {
        if (data != null) {
          this.FotosEmpresasList = data;
          console.log(this.FotosEmpresasList);
        }
      },
      (error) => {
        console.log('Error al obtener Fotos Empresas:', error);
      }
    );
  }
  // MOSTRAR FOTOS

  // LIMPIAR LISTAS VARIABLES
  limpiarAll() {
    // this.listFotosEmpresa = {} as FotosEmpresasResponse;
    this.FotosEmpresasList = [];
  }
  // LIMPIAR LISTAS VARIABLES

}
