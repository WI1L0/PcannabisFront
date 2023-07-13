import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from './scripts/all-scripts.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mostrarHeader = true;
  mostrarFooter = true;
  //implementar js en los componentes
  constructor(private router: Router, private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/home"]);

    //quitar el header 
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/admin/principal' || event.url == '/usuarios/gestion' || event.url == '/usuarioss/crear' || event.url == '/empresas/gestion' || event.url == '/formulario/ver' || event.url == '/formularios/detalle' || event.url == '/noticias/ver' || event.url == '/noticia/crears' || event.url == '/usuario/edit' || event.url == '/noti/editar') {
          this.mostrarHeader = false;
        } else {
          this.mostrarHeader = true;
        }
      }
    });

    //quitar el footer
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el encabezado en la página de inicio
        if (event.url === '/admin/principal' || event.url == '/usuarios/gestion' || event.url == '/usuarioss/crear' || event.url == '/empresas/gestion' || event.url == '/formulario/ver' || event.url == '/formularios/detalle' || event.url == '/noticia/crears') {
          this.mostrarFooter = false;
        } else {
          this.mostrarFooter = true;
        }
      }
    });
  }



  ngOnInit(): void {
  }

}