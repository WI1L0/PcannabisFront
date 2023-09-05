import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fotos } from 'src/app/modelos/Fotos';
import { Personas } from 'src/app/modelos/Personas';
import { Usuarios } from 'src/app/modelos/Usuarios';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
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

  public submitted: boolean = false;


  usuariosObject: Usuarios = new Usuarios();
  personasObject: Personas = new Personas();

  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;
  editFoto: boolean = false;

  cuerpoUrlFoto: string = baserUrlImagenes;

  constructor(
    private loginServices: SloginService,
    private router: Router,
    private fotoServices: SfotosService,
    private usuarioServices: SusuariosService,
    private personaServices: SpersonasService
  ) { }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }

    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosObject = {} as Usuarios;

    const usuario = localStorage.getItem('usuario');
    if (usuario != null) {
      this.usuariosObject = JSON.parse(usuario);
      if (this.usuariosObject.personas != null) {
        this.personasObject = this.usuariosObject.personas;
      }

      this.usuarioServices.getObtenerRolUsuario(Number(this.usuariosObject.idUsuario)).subscribe(
        (data) => {
          if (data != null) {
            const selectElement = document.getElementById("mySelectRol") as HTMLSelectElement;
            const desiredOption = Array.from(selectElement.options).find((option) => option.value === data.nombreRol);
          }
        }
      )

      const selectElement = document.getElementById("mySelectGenero") as HTMLSelectElement;
      const desiredOption = Array.from(selectElement.options).find((option) => option.value === this.personasObject.genero);

      if (desiredOption) {
        desiredOption.selected = true;
      }
    } else {
      // history.back();
      this.router.navigate(['/cbd/superAdmin/usuarios/listar']);
    }
  }

  seleccionarFoto(evento: Event) {
    this.obtenerFoto = evento.target as HTMLInputElement;

    if (this.obtenerFoto.files?.length) {
      const reader = new FileReader();
      this.procesarFoto = this.obtenerFoto.files[0];

      reader.addEventListener('load', () => {
        this.imagenPreview = reader.result as string;
      });

      reader.readAsDataURL(this.procesarFoto);
    }
  }

  almacenarFoto(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.procesarFoto) {
        const formData = new FormData();
        formData.append('file', this.procesarFoto, this.procesarFoto.name);

        let nameFoto = new Fotos();
        this.fotoServices.postFotos(formData).subscribe((data) => {
          if (data != null) {
            nameFoto = data;
            if (nameFoto.url) {
              resolve(nameFoto.url); // Resuelve la promesa con el valor de nameFoto.url
            } else {
              resolve("");
            }
          }
        }, (error) => {
          reject(error);
        });
      }
    });
  }

  borrarImagen() {
    this.obtenerFoto.value = '';
    this.procesarFoto = null;
    this.imagenPreview = null;
  }

  editarFoto() {
    this.editFoto = true;
  }

  updatePersonaUsuario() {
    this.personasObject.genero = (<HTMLSelectElement>document.getElementById('mySelectGenero')).value;
    this.submitted = true;
    if (this.personasObject.nombre1 &&
      this.personasObject.nombre2 &&
      this.personasObject.apellido1 &&
      this.personasObject.apellido2 &&
      this.personasObject.celular &&
      this.personasObject.correo &&
      this.personasObject.barrio &&
      this.personasObject.ciudad &&
      this.personasObject.referencia &&
      this.personasObject.genero != "Seleccione una opción" &&
      (<HTMLSelectElement>document.getElementById('mySelectRol')).value != "Seleccione una opción" &&
      this.usuariosObject.passwordUsuario) {
      Swal.fire({
        title: '¿Estas seguro de editar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.almacenarFoto().then(
            (url) => {
              this.usuariosObject.fotoUsuario = url;
              this.personaServices.putPersona(this.personasObject).subscribe(
                (data) => {
                  if (data != null) {
                    this.usuarioServices.putUsuario(this.usuariosObject, (<HTMLSelectElement>document.getElementById('mySelectRol')).value).subscribe(
                      (data) => {
                        if (data != null) {
                          Swal.fire(
                            'Editada!',
                            'El usuario fue editado exitosamente.',
                            'success'
                          ).then((result) => {
                            if (result.isConfirmed) {
                              this.personasObject = {} as Personas;
                              this.usuariosObject = {} as Usuarios;
                              this.router.navigate(['/cbd/superAdmin/usuarios/listar']);
                            }
                          })
                        } else {
                          Swal.fire({
                            title: 'No Editada!',
                            text: 'El usuario no fue editado.',
                            icon: 'error'
                          });
                        }
                      }
                    )
                  } else {
                    Swal.fire({
                      title: 'No Editada!',
                      text: 'El usuario no fue editado.',
                      icon: 'error'
                    });
                  }
                }
              )
            }
          )

        }
      });
    } else {
      Swal.fire({

        title: 'No Editado!',
        text: 'Los campos estan vacios o erroneos',
        icon: 'error'
      })
    }

  }

  salir() {
    localStorage.removeItem('usuario');
    history.back();
  }

}
