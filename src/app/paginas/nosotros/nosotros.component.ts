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

  tvalor1?: string; 
  tvalor2?: string; 
  tvalor3?: string; 
  tvalor4?: string; 
  tvalor5?: string; 
  tvalor6?: string; 

  cvalor1?: string;
  cvalor2?: string;
  cvalor3?: string;
  cvalor4?: string;
  cvalor5?: string;
  cvalor6?: string;

  ngOnInit(): void {
    this.obtenerEst();
  }

 public empresaObject = new Empresas();

  obtenerEst() {
    this.ServiceEmpresa.getPorName("Pharma cannabis").subscribe(
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