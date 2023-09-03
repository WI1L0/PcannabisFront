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
  hederAll = true;
  footer = true;
  flotante = true;
  hederAdministrativo = false;
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
        if (event.url === '/cbd/panel' || event.url == '/cbd/superAdmin' || event.url == '/cbd/admin' || event.url == '/cbd/login') {
          this.hederAll = false;
          this.flotante = false;
          this.footer = false;
          this.hederAdministrativo = true;
        } else {
          this.hederAll = true;
          this.flotante = true;
          this.footer = true;
          this.hederAdministrativo = false;

          this.loginServices.deleteTokenAndRoles();
        }
      }
    });


    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/cbd/all-productos') {
          this.hederAll = false;
          this.flotante = false;
          this.footer = false;
          this.hederAdministrativo = false;
          this.headerNunakay = true;
          this.loginServices.deleteTokenAndRoles();
        } else {
          this.headerNunakay = false;
        }
      }
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/cbd/login') {
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
}