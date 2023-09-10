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

  changePersona: boolean = false;
  changeUsuario: boolean = false;

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
            const desiredOptionrol = Array.from(selectElement.options).find((option) => option.value === data.nombreRol);

            if (desiredOptionrol) {
              desiredOptionrol.selected = true;
            }
          }
        }
      )

      const selectElement = document.getElementById("mySelectGenero") as HTMLSelectElement;
      const desiredOptiongenero = Array.from(selectElement.options).find((option) => option.value === this.personasObject.genero);

      if (desiredOptiongenero) {
        desiredOptiongenero.selected = true;
      }
    } else {
      history.back();
      // this.router.navigate(['/cbd/superAdmin/usuarios/listar']);
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
          if (this.changePersona) {
            this.almacenarper();
          } else if (this.changeUsuario || this.imagenPreview) {
            if (this.imagenPreview) {
              let veri1;
              this.fotoServices.deleteFotos(String(this.usuariosObject.fotoUsuario)).subscribe(
                (datafo) => {
                  veri1 = !!datafo;
                  if (veri1) {
                    this.almacenarFoto().then(
                      (url) => {
                        this.usuariosObject.fotoUsuario = url;
                        this.almacenarusu();
                      }
                    )
                  } else {
                    Swal.fire({
                      title: 'No Editado!',
                      text: 'IIntentar nuevamente',
                      icon: 'error'
                    })
                  }
                }
              )
            } else {
              this.almacenarusu();
            }
          }
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

  cambioUsuario() {
    this.changeUsuario = true;
  }

  cambioPersona() {
    this.changePersona = true;
  }

  almacenarusu() {
    if (this.validarDatos()){
      this.usuarioServices.putUsuario(this.usuariosObject, (<HTMLSelectElement>document.getElementById('mySelectRol')).value).subscribe(
        (data) => {
          if (data != null) {
            Swal.fire(
              'Editada!',
              'El usuario fue editado exitosamente.',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.usuariosObject = {} as Usuarios;
                history.back();
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
    }
  }

  almacenarper() {
    this.personaServices.putPersona(this.personasObject).subscribe(
      (data) => {
        if (data != null) {
          if (this.changeUsuario || this.imagenPreview) {
            this.personasObject = {} as Personas;
            this.almacenarusu();
          } else {
            Swal.fire(
              'Editada!',
              'El usuario fue editado exitosamente.',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.personasObject = {} as Personas;
                history.back();
              }
            })
          }
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

  salir() {
    localStorage.removeItem('usuario');
    history.back();
  }

  validarnombre(): boolean {
    let ban: boolean = true
    if (/^\d+$/.test(String(this.personasObject.nombre1 || this.personasObject.nombre2))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que los nombres esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false
    }
    return ban
  }

  validarapellido(): boolean {
    let ban: boolean = true
    if (/^\d+$/.test(String(this.personasObject.apellido1 || this.personasObject.apellido2))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que los apellidos esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban;
  }

  validarcelular(): boolean {
    let ban: boolean = true
    if (!/^\d+$/.test(String(this.personasObject.celular)) || (!/^\d{10}$/.test(String(this.personasObject.celular)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El célular es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban
  }

  validarcorreo(): boolean {
    let ban: boolean = true
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexCorreo.test(String(this.personasObject.correo))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que el email este correcto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban
  }

  validarDatos(): boolean {
    const celularValido = this.validarcelular();
    const correoValido = this.validarcorreo();
    const nombreValido = this.validarnombre();
    const apellidoValido = this.validarapellido();



    return celularValido && correoValido && nombreValido && apellidoValido;

  }

}
