import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from './scripts/all-scripts.service';
import { NavigationEnd, Router } from '@angular/router';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import { Empresas } from './modelos/Empresas';
import { SEmpresasService } from './services/s-empresas.service';
import { SloginService } from './services/s-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hederAll = false;
  footer = false;
  flotante = false;
  hederAdministrativo = true;
  headerNunakay = false;

  empresaData: Empresas = new Empresas();

  //implementar js en los componentes
  constructor(
    private router: Router,
    private AllScripts: AllScriptsService,
    private empresasServices: SEmpresasService,
    private loginServices: SloginService
  ) {
    AllScripts.Cargar(["default/home"]);

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/cbd/home' || event.url == '/cbd/nosotros' || event.url == '/cbd/cannabis' || event.url == '/cbd/all-noticias' || event.url == '/cbd/detalle-noticias') {
          this.desactivar();

          this.hederAll = true;
          this.flotante = true;
          this.footer = true;

          this.loginServices.deleteTokenAndRoles();
        }
      }
    });


    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/cbd/all-productos') {
          this.desactivar();

          this.headerNunakay = true;

          this.loginServices.deleteTokenAndRoles();
        } 
      }
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/cbd/login') {
          this.desactivar();

          this.hederAdministrativo = true;

          localStorage.setItem('cbdLogin','true');
          this.loginServices.deleteTokenAndRoles();
        } else {
          localStorage.removeItem('cbdLogin');
        }
      }
    });
  }


  ngOnInit(): void {
    this.almacenarUrl();
  }

  almacenarUrl() {
    this.empresasServices.getEmpresa(nameEmpresa).subscribe(
      (data: any) => {
        this.empresaData = data;
        localStorage.removeItem('urlButton');
        localStorage.setItem('urlButton', String(this.empresaData.urlCelularEmpresa))
      }, (error) => {
        console.log(error);
      }
    )
  }

  desactivar(){
    this.hederAll = false;
    this.flotante = false;
    this.footer = false;
    this.hederAdministrativo = false;
    this.headerNunakay = false;
  }
}