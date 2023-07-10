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
    // this.obtenerEst();
  }
  // public empresaObject = new Empresas();


  // obtenerEst() {
  //   this.ServiceEmpresa.getPorName("Pharma cannabis").subscribe(
  //     data => {
  //       this.empresaObject = data;
  //       this.empresaObject.idEmpresas = data.idEmpresas;
  //       this.empresaObject.nombreEmp = data.nombreEmp;
  //       this.empresaObject.historia = data.historia;
  //       this.empresaObject.mision = data.mision;
  //       this.empresaObject.vision = data.vision;
  //       this.empresaObject.direccion = data.direccion;
  //       this.empresaObject.longitud = data.longitud;
  //       this.empresaObject.latitud = data.latitud;
  //       this.empresaObject.estEmpresas = data.estEmpresas;

  //       if (typeof data.valor1 === 'string') {
  //         this.empresaObject.valor1 = this.splitTitleAndDescription(data.valor1);

  //       }else {
  //         this.empresaObject.valor1 = data.valor1;
  //       }
        
      
  //       // if(typeof data.valor2 === 'string') {
  //       //   this.empresaObject.valor2 = this.splitTitleAndDescription(data.valor2);
  //       // } else {
  //       //   this.empresaObject.valor2 = data.valor2;
  //       // } 
  //       // for (let i = 1; i <= 2; i++) {
  //       //   const valorProp: keyof Empresas = `valor${i}` as keyof Empresas;
          
  //       //   if (!this.empresaObject.hasOwnProperty(valorProp)) {
  //       //     this.empresaObject[valorProp] = {};
  //       //   }
        
  //       //   if (typeof data[valorProp] === 'string') {
  //       //     this.empresaObject[valorProp] = this.splitTitleAndDescription(data[valorProp]);
  //       //   } else if (typeof data[valorProp] === 'object') {
  //       //     this.empresaObject[valorProp] = data[valorProp];
  //       //   }
  //       // }
        
  //     }
  //   );
  // }
  // // splitTitleAndDescription(value: string): { titulo: string, descripcion: string } {
  // //   if (!value) {
  // //     return { titulo: '', descripcion: '' };
  // //   }
  // //   const [titulo, descripcion] = value.split('*');
  // //   return { titulo, descripcion };
  // // }
  
  // splitTitleAndDescription(value: string): { titulo: string, descripcion: string } {
  //   const [titulo, descripcion] = value.split('*');
  //   return { titulo, descripcion };
  // }



  //  }
}