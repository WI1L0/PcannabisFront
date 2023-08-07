import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from './scripts/all-scripts.service';
import { NavigationEnd, Router } from '@angular/router';
import nameEmpresa from './services/defauld/EmpresaName';
import { Empresas } from './modelos/Empresas';
import { SEmpresasService } from './services/s-empresas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mostrarHeader = true;
  mostrarFooter = true;
  mostrarHeader2 = false;

  empresaData: Empresas = new Empresas();

  //implementar js en los componentes
  constructor(
    private router: Router,
    private AllScripts: AllScriptsService,
    private empresasServices: SEmpresasService
  ) {
    AllScripts.Cargar(["default/home"]);

    //quitar el header 
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/cbd/admin/panel' || event.url == '/cbd/admin/usuarios/listar' || event.url == '/cbd/admin/usuarios/crear' || event.url == '/cbd/admin/usuarios/editar' || event.url == '/cbd/admin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/admin/usuarios/detalle') {
          this.mostrarHeader = false;
        } else {
          this.mostrarHeader = true;
        }
      }
    });
    //mostrar el header admin
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/cbd/admin/panel' || event.url == '/cbd/admin/usuarios/listar' || event.url == '/cbd/admin/usuarios/crear' || event.url == '/cbd/admin/usuarios/editar' || event.url == '/cbd/admin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/admin/usuarios/detalle') {
          this.mostrarHeader2 = true;
        } else {
          this.mostrarHeader2 = false;
        }
      }
    });

    //quitar el footer
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/cbd/admin/panel' || event.url == '/cbd/admin/usuarios/listar' || event.url == '/cbd/admin/usuarios/crear' || event.url == '/cbd/admin/usuarios/editar' || event.url == '/cbd/admin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/admin/usuarios/detalle') {
          this.mostrarFooter = false;
        } else {
          this.mostrarFooter = true;
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