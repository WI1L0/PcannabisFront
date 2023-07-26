import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from 'src/app/modelos/Noticias';
import { NoticiasResponse } from 'src/app/modelos/Respuestas/NoticiasResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SnoticiasService } from 'src/app/services/s-noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-noticias',
  templateUrl: './listar-noticias.component.html',
  styleUrls: ['./listar-noticias.component.scss'],
})
export class ListarNoticiasComponent implements OnInit {
  //paginacion
  pagActua: number = 0;
  pagExist: any = 0;
  listNoticias: any[] = [];
  cuerpoUrlFoto: string = baserUrlImagenes;
  respuestaNoticias: NoticiasResponse = new NoticiasResponse();

  //para estados
  datoEstado: any = '';

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private noticiasServices: SnoticiasService,
    private loginServices: SloginService,
    private router: Router
  ) {
    AllScripts.Cargar(['paginas/noticias']);
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
    this.obtenerNoticias();
  }
  // ALMACENAR ESTADO DE VISUALIZACION

  // MOSTRAR NOTICIAS
  obtenerNoticias() {
    this.listNoticias = [];
    let TituloOrFecha = (<HTMLInputElement>document.getElementById('busqueda'))
      .value;

    this.noticiasServices
      .getNoticias(this.pagActua, this.datoEstado, nameEmpresa, TituloOrFecha)
      .subscribe(
        (response: NoticiasResponse) => {
          this.respuestaNoticias = response;
          this.pagExist = response.totalPagina;
          this.listNoticias = this.listNoticias.concat(
            this.respuestaNoticias.contenido
          );
        },
        (error) => {
          console.log('Error al obtener noticias:', error);
        }
      );
  }
  // MOSTRAR NOTICIAS

  // PAGINACION
  nextPagina() {
    if (this.pagActua != this.pagExist) {
      this.pagActua++;
      this.obtenerNoticias();
    }
  }

  previoPagina() {
    if (this.pagActua != 0) {
      this.pagActua--;
      this.obtenerNoticias();
    }
  }
  // PAGINACION

  // PASAR A DETALLE NOTICIA
  setNoticiaADetalle(noticia: Noticias) {
    localStorage.removeItem('noticia');
    localStorage.setItem('noticia', JSON.stringify(noticia));
  }
  // PASAR A DETALLE NOTICIA

  // ELIMINAR NOTICIA
  confirmEliminar(noti: Noticias) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta noticia?',
      text: 'Se eliminarán todos los registros de esta noticia de manera permanente y no se podrán recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Para confirmar la eliminación, escriba la siguiente cadena:',
          text: `${noti.ubicacionNoticia}:${noti.fechaNoticia}`,
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: (confirmValue) => {
            if (
              confirmValue === `${noti.ubicacionNoticia}:${noti.fechaNoticia}`
            ) {
              if (
                this.noticiasServices
                  .deleteNoticias(Number(noti.idNoticia))
                  .subscribe((resu) => {
                    return resu.estNoticia;
                  })
              ) {
                Swal.fire('eliminada', 'noticia eliminada', 'success').then(
                  (res) => {
                    this.obtenerNoticias();
                  }
                );
              } else {
                Swal.fire('no eliminada', 'noticia no eliminada', 'error');
              }
            } else {
              Swal.showValidationMessage('El valor ingresado no es correcto');
            }
          },
        });
      }
    });
  }
  // ELIMINAR NOTICIA

  // OCULTAR Y MOSTRAR NOTICIAS
  alertOcultarMostrar(
    noti: Noticias,
    mensajeTitle: string,
    mensajeText: string,
    mensajeTrue: string,
    mensajeFalse: string
  ) {
    Swal.fire({
      title: '¿Estas seguro de ' + `${mensajeTitle}` + ' esta noticia?',
      text:
        'las noticias ocultas ' +
        `${mensajeText}` +
        ' ser vistas por el publico en general',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ocultar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.noticiasServices
            .putNoticiaEstado(Number(noti.idNoticia))
            .subscribe((resu) => {
              return resu.estOcultoVisibleNoticia;
            })
        ) {
          Swal.fire(
            'Noticia ' + `${mensajeTrue}` + ' exitosamente',
            'success'
          ).then((res) => {
            this.obtenerNoticias();
          });
        } else {
          Swal.fire(' Error al ' + `${mensajeFalse}` + ' noticia', 'error');
        }
      }
    });
  }
  // OCULTAR Y MOSTRAR NOTICIAS
}
