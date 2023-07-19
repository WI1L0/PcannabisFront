import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import { SEmpresasService } from 'src/app/services/s-empresas.service';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-actualizar-empresa',
  templateUrl: './actualizar-empresa.component.html',
  styleUrls: ['./actualizar-empresa.component.scss']
})
export class ActualizarEmpresaComponent  implements OnInit {

  empresaData: Empresas = new Empresas();

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasServices: SEmpresasService, private loginServices: SloginService, private router: Router) {
    AllScripts.Cargar(["paginas/empresas"]);
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()){
      this.router.navigate(['/cbds/login']);
    }

    this.ObtenerEmpresa();

  }

  ObtenerEmpresa() {
    this.empresaData = new Empresas();
    this.empresasServices.getEmpresa(nameEmpresa).subscribe(
      (data: any) => {
        this.empresaData = data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  updateEmpresas(emp: any){
    console.log("ssssssssssssssssssssssssssssssssss");
    this.empresasServices.putEmpresa(emp.idEmpresa, emp)
    console.log("ssssssssssssssssssssssssssssssssss");
    
  }
  
}