import { Component, OnInit } from '@angular/core';
import { ContactanosResponse } from 'src/app/modelos/Respuestas/ContactanosResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { ScontactanosService } from 'src/app/services/s-contactanos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { Router } from '@angular/router';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';

@Component({
  selector: 'app-listar-contactanos',
  templateUrl: './listar-contactanos.component.html',
  styleUrls: ['./listar-contactanos.component.scss']
})
export class ListarContactanosComponent implements OnInit {

  admin = false;
  logeado = false;

  pagActua: number = 0;
  pagExist: any = 0;
  respuestaContactanos: ContactanosResponse = new ContactanosResponse;
  listContactanos: any[] = [];

    //implementar js en los componentes
    constructor(private AllScripts: AllScriptsService, private contactanosServices: ScontactanosService, private router: Router, private loginServices: SloginService) {
      // AllScripts.Cargar(["paginas/contactanos"]);
    }
  
    ngOnInit(): void {
      if (!this.loginServices.estaLogin()){
        this.router.navigate(['/lg/login']);
      }
      
      console.log("t3422243")
      this.obtenerContactenos();

    }
  
    obtenerContactenos() {
      console.log("ssddd")
      this.listContactanos = [];
      this.contactanosServices.getContactanos(this.pagActua, "activo", nameEmpresa).subscribe(
        (response: ContactanosResponse) => {
          this.respuestaContactanos = response;
          this.pagExist = response.totalPagina;
          this.listContactanos = this.listContactanos.concat(this.respuestaContactanos.contenido);
          console.log(this.listContactanos)
        },
        error => {
          console.log('Error al obtener noticias:', error);
        }
      );
    }
  
    nextPagina() {
      if (this.pagActua != this.pagExist - 1) {
        this.pagActua++;
        this.obtenerContactenos();
      }
    }
  
    previoPagina() {
      if (this.pagActua != 0) {
        this.pagActua--;
        this.obtenerContactenos();
      }
    }
  }
