import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import { SEmpresasService } from 'src/app/services/s-empresas.service';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  admin = false;
  logeado = false;
  empresaData: Empresas = new Empresas();

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasService: SEmpresasService, private loginServices: SloginService) {
    AllScripts.Cargar(["default/footer"]);
  }

  ngOnInit(): void {
    this.parteAdministrador();

    this.ObtenerEmpresa();
  }

  ObtenerEmpresa() {
    this.empresasService.getEmpresa(nameEmpresa).subscribe(
      (data: any) => {
        this.empresaData = data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  parteAdministrador() {
    this.logeado = this.loginServices.estaLogin();
    if (this.loginServices.getRoles('rolAdministrador') === 'true') {
      this.admin = true;
    }
  }

}
