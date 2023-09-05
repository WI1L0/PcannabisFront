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
        if (event.url === '/cbd/panel' || event.url == '/cbd/login' ||  event.url == '/cbd/superAdmin/empresa' ||event.url == '/cbd/superAdmin/galeria' || 
        event.url == '/cbd/superAdmin/usuarios/listar' || event.url == '/cbd/superAdmin/usuarios/crear' || event.url == '/cbd/superAdmin/usuarios/editar' || event.url == '/cbd/superAdmin/usuarios/detalle' || 
        event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/contactanos/detalle' || 
        event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/admin/noticias/detalle' || 
        event.url == '/cbd/admin/productos/listar' || event.url == '/cbd/admin/productos/crear' || event.url == '/cbd/admin/productos/editar' || event.url == '/cbd/admin/productos/detalle'){
          this.desactivar();
          this.hederAdministrativo = true;
        } else {
          this.desactivar();

          this.hederAll = true;
          this.flotante = true;
          this.footer = true;

          // this.loginServices.deleteTokenAndRoles();
        }
      }
    });


    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/cbd/all-productos') {
          this.desactivar();

          this.headerNunakay = true;

          // this.loginServices.deleteTokenAndRoles();
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