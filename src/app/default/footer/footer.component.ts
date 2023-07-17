import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  myUnsafeUrl: string = '';
  myUnsafeUrl2: string = '';
  myUnsafeUrlDireccion:string | undefined = this.empresaData.urlDireccionEmpresa;
  myUnsafeUrlCelular:string |undefined = this.empresaData.urlCelularEmpresa;
  sanitizedUrl: SafeResourceUrl = '';
  sanitizedUrl2: SafeResourceUrl = '';
  sanitizedUrlDireccion: SafeResourceUrl;
  sanitizedUrlCelular: SafeResourceUrl = '';
 
  myUnsafeUrlempresa: string | undefined  = this.empresaData.urlDireccionEmpresaGoogle;
  sanitizedUrlEmpresa: SafeResourceUrl='';
  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService, private empresasService: SEmpresasService, private loginServices: SloginService, private sanitizer: DomSanitizer) {
    AllScripts.Cargar(["default/footer"]);

    this.myUnsafeUrl = 'https://www.facebook.com/pharmacanabismedical/';
    this.myUnsafeUrl2 = 'https://www.instagram.com/pharmacannabismedical/';
    this.sanitizedUrlDireccion = this.sanitizer.bypassSecurityTrustResourceUrl(this.myUnsafeUrlDireccion ?? '');
    this.sanitizedUrlCelular = this.sanitizer.bypassSecurityTrustResourceUrl(this.myUnsafeUrlCelular ?? '');
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.myUnsafeUrl);
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.myUnsafeUrl2);
    this.sanitizedUrlEmpresa = this.sanitizer.bypassSecurityTrustResourceUrl(this.myUnsafeUrlempresa ?? '');
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
