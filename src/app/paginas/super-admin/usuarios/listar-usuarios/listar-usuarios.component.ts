import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosResponse } from 'src/app/modelos/Respuestas/UsuariosResponse';
import { Usuarios } from 'src/app/modelos/Usuarios';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SloginService } from 'src/app/services/s-login.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  // PAGINACION
  pagActua: number = 0;
  pagExist: any = 0;
  listUsu: any[] = [];
  respuestaUsuarios: UsuariosResponse = new UsuariosResponse();

  // CUERPO DE LA URL IMAGENES
  cuerpoUrlFoto: string = baserUrlImagenes;

  // ESTADOS
  datoEstado: any = '';

  constructor(
    private loginServices: SloginService,
    private router: Router,
    private usuarioServices: SusuariosService
  ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }
    this.almacenarEstado('desbloqueado');
  }

  // ALMACENAR ESTADO DE VISUALIZACION
  almacenarEstado(estado: string) {
    this.datoEstado = estado;
    this.obtenerUsuarios();
  }
  // ALMACENAR ESTADO DE VISUALIZACION

  // MOSTRAR USUARIOS
  obtenerUsuarios() {
    this.limpiarAll();
    let TituloOrFecha = (<HTMLInputElement>document.getElementById('busqueda'))
      .value;

    this.usuarioServices
      .getUsuarios(this.pagActua, this.datoEstado, nameEmpresa, TituloOrFecha)
      .subscribe(
        (response: UsuariosResponse) => {
          this.respuestaUsuarios = response;
          this.pagExist = response.totalPagina;
          if (this.respuestaUsuarios.contenidoUsuarios != null) {
            this.listUsu = this.respuestaUsuarios.contenidoUsuarios;
          }
        },
        (error) => {
          console.log('Error al obtener noticias:', error);
        }
      );
  }
  // MOSTRAR USUARIOS

  // LIMPIAR LISTAS VARIABLES
  limpiarAll() {
    this.respuestaUsuarios = {} as UsuariosResponse;
    this.listUsu = [];
  }
  // LIMPIAR LISTAS VARIABLES

  // PAGINACION
  nextPagina() {
    if (this.pagActua != this.pagExist) {
      this.pagActua++;
      this.obtenerUsuarios();
    }
  }

  previoPagina() {
    if (this.pagActua != 0) {
      this.pagActua--;
      this.obtenerUsuarios();
    }
  }
  // PAGINACION

  // PASAR A DETALLE USUARIOS
  almacenarUsuario(usuarios: Usuarios) {
    localStorage.removeItem('usuario');
    localStorage.setItem('usuario', JSON.stringify(usuarios));
    this.router.navigate(['/cbd/superAdmin/usuarios/detalle']);
  }
  // PASAR A DETALLE USUARIOS

  // ELIMINAR USUARIOS
  confirmEliminar(usua: Usuarios) {
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
          text: `${usua.nombreUsuario}:${usua.personas?.cedula}`,
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: (confirmValue) => {
            if (
              confirmValue === `${usua.nombreUsuario}:${usua.personas?.cedula}`
            ) {
              let re = this.usuarioServices
                .deleteUsuarios(Number(usua.idUsuario))
                .subscribe((resu) => {
                  if (resu != null) {
                    return true;
                  } else {
                    return false;
                  }
                })
              if (re) {
                Swal.fire('eliminada', 'noticia eliminada', 'success').then(
                  (res) => {
                    this.obtenerUsuarios();
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
  // ELIMINAR USUARIOS


  // BLOQUEAR Y DESBLOQUEAR USUARIOS
  alertBloquearOrDesbloquear(
    usua: Usuarios,
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
        let re = this.usuarioServices
          .putUsuariosEstadoBloqueado(Number(usua.idUsuario))
          .subscribe((resu) => {
            if (resu != null) {
              return true;
            } else {
              return false;
            }
          })
        if (re) {
          Swal.fire(
            'Noticia ' + `${mensajeTrue}` + ' exitosamente',
            'success'
          ).then((res) => {
            this.obtenerUsuarios();
          });
        } else {
          Swal.fire(' Error al ' + `${mensajeFalse}` + ' noticia', 'error');
        }
      }
    });
  }
  // BLOQUEAR Y DESBLOQUEAR USUARIOS

}