import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Empresas } from 'src/app/modelos/Empresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
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
  direccion: SafeResourceUrl='';
  direccion2:SafeResourceUrl='';
  whatsapp:SafeResourceUrl='';
  instagram: SafeResourceUrl = '';
  empresaData: Empresas = new Empresas();
  facebook: SafeResourceUrl= '';
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasService: SEmpresasService, private loginServices: SloginService, private sanitizer: DomSanitizer) {
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
        this.direccion = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.empresaData.urlDireccionEmpresaGoogle));
        this.direccion2 = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.empresaData.urlDireccionEmpresa));
        this.whatsapp = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.empresaData.urlCelularEmpresa));
        this.instagram = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.instagram.com/pharmacannabismedical/");
        this.facebook = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.facebook.com/pharmacanabismedical/");
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
