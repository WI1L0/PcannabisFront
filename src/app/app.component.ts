import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from './scripts/all-scripts.service';
import { NavigationEnd, Router } from '@angular/router';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
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
  mostrarFlotante = true;
  mostrarHeader2 = false;
  mostrarHeaderNunakay = false;

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
        if (event.url === '/cbd/panel' || event.url == '/cbd/superAdmin/usuarios/listar' || event.url == '/cbd/superAdmin/usuarios/crear' || event.url == '/cbd/superAdmin/usuarios/editar' || event.url == '/cbd/superAdmin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/admin/usuarios/detalle' || event.url == '/cbd/superAdmin/galeria' || event.url == '/cbd/admin/productos/listar' || event.url == '/cbd/admin/productos/detalle' || event.url == '/cbd/admin/productos/editar' || event.url == '/cbd/admin/productos/crear' || event.url == '/cbd/all-productos') {
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
        if (event.url === '/cbd/panel' || event.url == '/cbd/superAdmin/usuarios/listar' || event.url == '/cbd/superAdmin/usuarios/crear' || event.url == '/cbd/superAdmin/usuarios/editar' || event.url == '/cbd/superAdmin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/superAdmin/usuarios/detalle' || event.url == '/cbd/superAdmin/galeria' || event.url == '/cbd/admin/productos/listar' || event.url == '/cbd/admin/productos/detalle' || event.url == '/cbd/admin/productos/editar' || event.url == '/cbd/admin/productos/crear') {
          this.mostrarHeader2 = true;
        } else {
          this.mostrarHeader2 = false;
        }
      }
    });

    //quitar el Footer y Header de Nunakay
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/cbd/all-productos') {
          this.mostrarHeaderNunakay = true;
        } else {
          this.mostrarHeaderNunakay = false;
        }
      }
    });

    //quitar el footer
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/cbd/panel' || event.url == '/cbd/superAdmin/usuarios/listar' || event.url == '/cbd/superAdmin/usuarios/crear' || event.url == '/cbd/superAdmin/usuarios/editar' || event.url == '/cbd/superAdmin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/superAdmin/usuarios/detalle' || event.url == '/cbd/superAdmin/galeria' || event.url == '/cbd/admin/productos/listar' || event.url == '/cbd/admin/productos/detalle' || event.url == '/cbd/admin/productos/editar' || event.url == '/cbd/admin/productos/crear' || event.url == '/cbd/all-productos') {
          this.mostrarFooter = false;
        } else {
          this.mostrarFooter = true;
        }
      }
    });

        //quitar flotante
        router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            // Ocultar el boton de la página de inicio
            if (event.url === '/cbd/panel' || event.url == '/cbd/superAdmin/usuarios/listar' || event.url == '/cbd/superAdmin/usuarios/crear' || event.url == '/cbd/superAdmin/usuarios/editar' || event.url == '/cbd/superAdmin/empresa' || event.url == '/cbd/admin/contactanos/listar' || event.url == '/cbd/admin/noticias/listar' || event.url == '/cbd/admin/noticias/crear' || event.url == '/cbd/admin/noticias/detalle' || event.url == '/cbd/admin/noticias/editar' || event.url == '/cbd/login' || event.url == '/cbd/admin/contactanos/detalle' || event.url == '/cbd/superAdmin/usuarios/detalle' || event.url == '/cbd/superAdmin/galeria' || event.url == '/cbd/admin/productos/listar' || event.url == '/cbd/admin/productos/detalle' || event.url == '/cbd/admin/productos/editar' || event.url == '/cbd/admin/productos/crear') {
              this.mostrarFlotante = false;
            } else {
              this.mostrarFlotante = true;
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