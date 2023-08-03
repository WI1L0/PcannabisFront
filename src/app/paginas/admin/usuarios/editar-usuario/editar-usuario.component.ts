import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/modelos/Personas';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { SloginService } from 'src/app/services/s-login.service';
import { SpersonasService } from 'src/app/services/s-personas.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  objectPersona: Personas = new Personas();
  objectUsuario: Usuarios = new Usuarios();
  public submitted: boolean = false;


  constructor(private loginServices: SloginService, private router: Router, private usuarioServices: SusuariosService, private personaServices: SpersonasService) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/lg/login']);
    }

    this.obtenerPersona();
    this.obtenerUsuario();

  }

  obtenerPersona() {
    this.objectPersona = new Personas;
    this.personaServices.getOnePersona(Number(localStorage.getItem('IdPersonaSelecto'))).subscribe(
      data => {
        console.log(data);
        this.objectPersona = data;
        localStorage.removeItem('IdPersonaSelecto');
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  obtenerUsuario() {
    this.objectUsuario = new Usuarios;
    this.usuarioServices.getOneUsuario(Number(localStorage.getItem('IdUsuarioSelecto'))).subscribe(
      data => {
        console.log(data);
        this.objectUsuario = data;
        localStorage.removeItem('IdUsuarioSelecto');
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  updatePersonaUsuario() {
    this.submitted = true;
    if (this.objectPersona.nombre1 && 
      this.objectPersona.nombre2 && 
      this.objectPersona.apellido1 &&
      this.objectPersona.apellido2 &&
      this.objectPersona.celular &&
      this.objectPersona.cedula &&
      this.objectPersona.correo &&
      this.objectPersona.barrio &&
      this.objectPersona.ciudad &&
      this.objectPersona.fNacimiento &&
      this.objectPersona.referencia &&
      this.objectPersona.genero ){
        Swal.fire({
          title: '¿Estas seguro de editar la noticia?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Editar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.usuarioServices.putUsuario(this.objectUsuario).subscribe(
              (data) => {
                if (data != null) {
                  Swal.fire(
                    'Editada!',
                    'La Empresa fue editada exitosamente.',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                      this.objectUsuario = {} as Usuarios;
                      this.router.navigate(['/cbd/admin/panel']);
                    }
                  })
                } else {
                  Swal.fire({
                    title: 'No Editada!',
                    text: 'La empresa no fue editada.',
                    icon: 'error'
                  });
                }
              }
            )
          }
        });
      } else {
        Swal.fire({
  
          title: 'No Editada!',
          text: 'Los campos estan vacios o erroneos',
          icon: 'error'
        })
      }
      
  }
  //alerta//
  confirmEditar() {
    Swal.fire({
      title: '¿Estas seguro de editar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Datos Actualizados!',
          'Usuario actualizado exitosamente.',
          'success'
        );
      }
    });
  }

  //alerta//
}
