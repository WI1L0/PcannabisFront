import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SEmpresasService } from 'src/app/services/s-empresas.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  providers: [SEmpresasService],
})
export class NosotrosComponent implements OnInit {
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private ServiceEmpresa: SEmpresasService) {
    AllScripts.Cargar(["default/nosotros"]);
  }

  ngOnInit(): void {
    this.obtenerEst();
  }

 public empresaObject = new Empresas();

  obtenerEst() {
    this.ServiceEmpresa.getPorName(1).subscribe(
      data => {
        this.empresaObject = data;
        this.empresaObject.idEmpresas = data.idEmpresas;
        this.empresaObject.nombreEmp = data.nombreEmp;
        this.empresaObject.historia = data.historia;
        this.empresaObject.mision = data.mision;
        this.empresaObject.vision = data.vision;
        this.empresaObject.direccion = data.direccion;
        this.empresaObject.valores = data.valores;
        this.empresaObject.longitud = data.longitud;
        this.empresaObject.latitud = data.latitud;
        this.empresaObject.estEmpresas = data.estEmpresas;
      }
    );
  }
}