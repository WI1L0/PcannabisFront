import { Component, OnInit } from '@angular/core';
import { ContactanosResponse } from 'src/app/modelos/Respuestas/ContactanosResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { ScontactanosService } from 'src/app/services/s-contactanos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { Router } from '@angular/router';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import Swal from 'sweetalert2';
import { Contactanos } from 'src/app/modelos/Contactanos';

@Component({
  selector: 'app-listar-contactanos',
  templateUrl: './listar-contactanos.component.html',
  styleUrls: ['./listar-contactanos.component.scss']
})
export class ListarContactanosComponent implements OnInit {

  //PAGINACION
  pagActua: number = 0;
  pagExist: any = 0;
  listContactanos: any[] = [];
  respuestaContactanos: ContactanosResponse = new ContactanosResponse();

  // ESTADOS
  datoEstado: any = '';

    constructor(
      private AllScripts: AllScriptsService, 
      private contactanosServices: ScontactanosService, 
      private router: Router, 
      private loginServices: SloginService
      ) {
      // AllScripts.Cargar(["paginas/contactanos"]);
    }
  
    ngOnInit(): void {
      if (!this.loginServices.estaLogin()){
        this.router.navigate(['/cbd/login']);
      }
    this.almacenarEstado('activo');
    }

      // ALMACENAR ESTADO DE VISUALIZACION
  almacenarEstado(estado: string) {
    this.datoEstado = estado;
    this.obtenerContactanos();
  }
  // ALMACENAR ESTADO DE VISUALIZACION

  // MOSTRAR CONTACTANOS
  obtenerContactanos() {
    this.limpiarAll();
    let TituloOrFecha = (<HTMLInputElement>document.getElementById('busqueda'))
      .value;

    this.contactanosServices
      .getContactanos(this.pagActua, this.datoEstado, nameEmpresa, TituloOrFecha)
      .subscribe(
        (response: ContactanosResponse) => {
          this.respuestaContactanos = response;
          this.pagExist = response.totalPagina;
          this.listContactanos = this.listContactanos.concat(
            this.respuestaContactanos.contenido
          );
        },
        (error) => {
          console.log('Error al obtener respuestas:', error);
        }
      );
  }
  // MOSTRAR CONTACTANOS
  
  // LIMPIAR LISTAS VARIABLES
  limpiarAll() {
    this.respuestaContactanos = {} as ContactanosResponse;
    this.listContactanos = [];
  }
  // LIMPIAR LISTAS VARIABLES

  // PAGINACION
  nextPagina() {
    if (this.pagActua != this.pagExist) {
      this.pagActua++;
      this.obtenerContactanos();
    }
  }

  previoPagina() {
    if (this.pagActua != 0) {
      this.pagActua--;
      this.obtenerContactanos();
    }
  }
  // PAGINACION

  // PASAR A DETALLE CONTACTANOS
  setContactanosDetalle(contactanos: Contactanos) {
    localStorage.removeItem('contactanos');
    localStorage.setItem('contactanos', JSON.stringify(contactanos));
    this.router.navigate(['/cbd/admin/contactanos/detalle']);
  }
  // PASAR A DETALLE CONTACTANOS

  // ELIMINAR CONTACTANOS
  confirmEliminar(contac: Contactanos) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta respuesta?',
      text: 'Se eliminarán todos los registros de esta respuesta de manera permanente y no se podrán recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Para confirmar la eliminación, escriba la siguiente cadena:',
          text: `${contac.nombreContactanos}:${contac.emailContactanos}`,
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: (confirmValue) => {
            if (
              confirmValue === `${contac.nombreContactanos}:${contac.emailContactanos}`
            ) {
              let re = this.contactanosServices
              .deleteContactanos(Number(contac.idContactanos))
              .subscribe((resu) => {
                if (resu != null){
                  return true;
                } else {
                  return false;
                }
              })
              if (re) {
                Swal.fire('eliminada', 'Respuesta eliminada', 'success').then(
                  (res) => {
                    this.obtenerContactanos();
                  }
                );
              } else {
                Swal.fire('no eliminada', 'Respuesta no eliminada', 'error');
              }
            } else {
              Swal.showValidationMessage('El valor ingresado no es correcto');
            }
          },
        });
      }
    });
  }
  // ELIMINAR CONTACTANOS

  // OCULTAR Y MOSTRAR CONTACTANOS
  alertOcultarMostrar(
    contac: Contactanos,
    mensajeTitle: string,
    mensajeText: string,
    mensajeTrue: string,
    mensajeFalse: string
  ) {
    Swal.fire({
      title: '¿Estas seguro de ' + `${mensajeTitle}` + ' esta respuesta?',
      text:
        'las respuestas ocultas ' +
        `${mensajeText}` +
        ' ser vistas por el público en general',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ocultar',
    }).then((result) => {
      if (result.isConfirmed) {
        let re = this.contactanosServices
            .putContactanosEstado(Number(contac.idContactanos))
            .subscribe((resu) => {
              if(resu != null) {
                return true;
              } else {
                return false;
              }
            })
        if (re) {
          Swal.fire(
            'Respuesta ' + `${mensajeTrue}` + ' exitosamente',
            'success'
          ).then((res) => {
            this.obtenerContactanos();
          });
        } else {
          Swal.fire(' Error al ' + `${mensajeFalse}` + ' respuesta', 'error');
        }
      }
    });
  }
  // OCULTAR Y MOSTRAR CONTACTANOS
  }
