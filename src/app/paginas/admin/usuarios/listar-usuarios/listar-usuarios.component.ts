import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosResponse } from 'src/app/modelos/Respuestas/UsuariosResponse';
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
export class ListarUsuariosComponent  implements OnInit {

  admin = false;
  logeado = false;

  pagActua: number = 0;
  pagExist: any = 0;
  respuestaUsuarios: UsuariosResponse = new UsuariosResponse;
  listUsuarios: any[] = [];
  listPersonas: any[] = [];

  cuerpoUrlFoto: string = baserUrlImagenes;

  constructor( private loginServices: SloginService, private router: Router, private usuarioServices: SusuariosService ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()){
      this.router.navigate(['/lg/login']);
    }

    this.obtenerUsuariosPersonas();

  }
  //mensaje de eliminar
  

  obtenerUsuariosPersonas() {
    this.listUsuarios = [];
    this.listPersonas = [];
    this.usuarioServices.getUsuariosPersonas(this.pagActua, "activo", nameEmpresa).subscribe(
      (response: UsuariosResponse) => {
        this.respuestaUsuarios = response;
        this.pagExist = response.totalPagina;
        this.listUsuarios = this.listUsuarios.concat(this.respuestaUsuarios.contenidoUsuarios);
        this.listPersonas = this.listPersonas.concat(this.respuestaUsuarios.contenidoPersonas);
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  nextPagina() {
    if (this.pagActua != this.pagExist - 1) {
      this.pagActua++;
      this.obtenerUsuariosPersonas();
    }
  }

  previoPagina() {
    if (this.pagActua != 0) {
      this.pagActua--;
      this.obtenerUsuariosPersonas();
    }
  }

  almacenarUsuario(IdUserSelect: any, IdPersonaSelect: any) {
    localStorage.setItem('IdUsuarioSelecto', IdUserSelect);
    localStorage.setItem('IdPersonaSelecto', IdPersonaSelect);
  }

  confirmEliminar() {
    Swal.fire({
      title: '¿Estas seguro de eliminar este usuario?',
      text: 'Se eliminarán todos los registros de este usuario de manera permantente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Usuario Eliminado!',
          '',
          'success'
        );
      }
    });
  }

  alertOcultar() {
    Swal.fire({
      title: '¿Estas seguro de ocultar este usuario?',
      text: 'Podrá verlos aún en la sección ocultos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ocultar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Usuario Oculto!',
          '',
          'success'
        );
      }
    });
  }

}