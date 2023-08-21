import { Component, OnInit } from '@angular/core';
import { FotosEmpresas } from 'src/app/modelos/FotosEmpresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosEmpresasService } from 'src/app/services/s-fotosEmpresas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cuerpoUrlFoto: string = baserUrlImagenes;

  fotosList: FotosEmpresas[] = [];

  fotoNunakay1: string = '';
  fotoNunakay2: string = '';
  fotoNunakay3: string = '';
  fotoNunakay4: string = '';

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private fotosEmpresasServices: SfotosEmpresasService,
  ) {
    AllScripts.Cargar(["paginas/home"]);
  }

  ngOnInit(): void {
    this.cargarFotosNunakay();
  }

  cargarFotosNunakay() {
    this.fotosEmpresasServices.getFotosEmpresas(nameEmpresa, 'Nunakay').subscribe(
      (data) => {
        if (data != null) {
          this.fotosList = data;
          if (this.fotosList[0].fotoEmpresa !== undefined) {
            this.fotoNunakay1 = this.fotosList[0].fotoEmpresa;
          }
          if (this.fotosList[1].fotoEmpresa !== undefined) {
            this.fotoNunakay2 = this.fotosList[1].fotoEmpresa;
          }
          if (this.fotosList[2].fotoEmpresa !== undefined) {
            this.fotoNunakay3 = this.fotosList[2].fotoEmpresa;
          }
          if (this.fotosList[3].fotoEmpresa !== undefined) {
            this.fotoNunakay4 = this.fotosList[3].fotoEmpresa;
          }
      }
      }
    )
  }

}
