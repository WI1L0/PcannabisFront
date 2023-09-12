import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Fotos } from 'src/app/modelos/Fotos';
import { Personas } from 'src/app/modelos/Personas';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SfotosNoticiasService } from 'src/app/services/s-fotosNoticias.service';
import { SpersonasService } from 'src/app/services/s-personas.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalDate } from "@js-joda/core";
import { SloginService } from 'src/app/services/s-login.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  personaObject: Personas = new Personas();
  usuarioData: Usuarios = new Usuarios();

  existCorreov: boolean = false;
  valContra: boolean = false;
  cedulaRegistrada: boolean = false;
  fNacimientoVariable: string = '';
  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;
  nombre: any;
  apellido: any;
  nombre2: any;
  apellido2: any;
  celular: any;
  confirmarPass = "";

  estadoSaveUpdate: boolean = false;


  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private loginServices: SloginService,
    private usuarioService: SusuariosService,
    private router: Router,
    private personasServices: SpersonasService,
    private fotoServices: SfotosService,
  ) {
    AllScripts.Cargar(["paginas/crearusuarios"]);
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }
    // this.personaObject.genero = "Masculino";
  }

  cargarCedula() {
    if (this.personaObject.cedula?.length == 10) {
      this.personasServices.getOnePersonaCedula(this.personaObject.cedula).subscribe(
        (data) => {
          if (data != null) {
            this.personaObject = data;
            this.cedulaRegistrada = true;
          }
        }
      )
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

  existCorreo(): boolean {
    let as: boolean = false;
    if (!this.cedulaRegistrada) {
      this.personasServices.existCorreo(String(this.personaObject.correo)).subscribe(
        (data) => {
          if (data != null) {
            this.existCorreov = !!data;

            if (this.existCorreov) {
              Swal.fire({
                position: 'top-right',
                icon: 'error',
                title: 'Correo ya registrado',
                showConfirmButton: false,
                timer: 1500,
                background: '#ffff',
                iconColor: '#4CAF50',
                padding: '1.25rem',
                width: '20rem',
                allowOutsideClick: false,
                allowEscapeKey: false,
              });
            } else {
              as = true;
            }
          }
        }
      );
    }
    return as;
  }

  validarRol(): boolean {
    let ban: boolean = true;
    const selectRol = (<HTMLSelectElement>document.getElementById('mySelectRol'));
    if (selectRol.value === 'Seleccione una opción') {
      Swal.fire({
        position: 'top-right',
        icon: 'warning',
        title: 'Seleccione una opción de rol',
        showConfirmButton: false,
        timer: 1500,
      });
      ban = false
    }
    return ban

  }

  validarContra(): boolean {
    let ff: boolean = true;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
    this.valContra = regex.test(String(this.usuarioData.passwordUsuario));
    if (!this.valContra) {
      Swal.fire({
        position: 'top-right',
        icon: 'error',
        title: 'La contraseña debe tener mínimo una mayúscula, minúscula, un número, un caracter y 8 dígitos',
        showConfirmButton: false,
        timer: 1500
      });
      ff = false
    } else {
      ff = true;
    }
    return ff;
  }

  almacenarNew() {
    this.estadoSaveUpdate = true;
    if (this.cedulaRegistrada) {
      if (this.validarNameUsuario()) {
        this.almacenarUsuario();
      } else {
        this.estadoSaveUpdate = false;
      }
    } else {
      this.estadoSaveUpdate = false;
    }
    this.personaObject.genero = (<HTMLSelectElement>document.getElementById('mySelectGenero')).value;
    if (this.validarDatos()) {
      this.personasServices.postPersona(this.personaObject).subscribe(
        (data) => {
          if (data != null) {
            this.estadoSaveUpdate = false;
            this.personaObject = data;
            if (this.validarNameUsuario()) {
              this.almacenarUsuario();
            } else {
              this.estadoSaveUpdate = false
            }
          } else {
            this.estadoSaveUpdate = false;
            Swal.fire({
              position: 'top-right',
              icon: 'error',
              title: 'No se pudo crear intentar nuevamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      )
    } else {
      this.estadoSaveUpdate = false
    }
  }



  almacenarUsuario() {
    if (this.validarCamposVacios()) {
      if (this.imagenPreview) {
        this.estadoSaveUpdate = true;
        this.almacenarFoto().then(
          (url) => {
            this.usuarioData.fotoUsuario = url;
            if (this.validarContra() && this.validarConfirmar()) {
              if (this.validarRol()) {
                this.usuarioService.guardarUsuarios(Number(this.personaObject.idPersona), (<HTMLSelectElement>document.getElementById('mySelectRol')).value, nameEmpresa, this.usuarioData).subscribe(
                  (data2) => {
                    if (data2 != null) {
                      this.estadoSaveUpdate = true;
                      Swal.fire({
                        position: 'top-right',
                        icon: 'success',
                        title: 'Usuario Creado Exitosamente',
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#ffff',
                        iconColor: '#4CAF50',
                        padding: '1.25rem',
                        width: '20rem',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      });

                      history.back();
                    } else {
                      this.estadoSaveUpdate = false;
                      Swal.fire({
                        position: 'top-right',
                        icon: 'error',
                        title: 'No se pudo crear intentar nuevamente',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  }

                )
              } else {
                this.estadoSaveUpdate = false;

              }
            } else {
              this.estadoSaveUpdate = false

            }
          }
        )
      } else {
        this.estadoSaveUpdate = false;
        Swal.fire({
          position: 'top-right',
          icon: 'warning',
          title: 'no hay una foto',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      this.estadoSaveUpdate = false

    }
    //     }
    //   }

    // )

  }

  //VALIDACIONES//
  validarCamposVacios(): boolean {
    const nombreUsuario = (<HTMLInputElement>document.getElementsByName('nombre_usuario')[0]).value;
    const selectRol = (<HTMLSelectElement>document.getElementById('mySelectRol')).value;
    const passwordUsuario = (<HTMLInputElement>document.getElementsByName('pass')[0]).value;
    const confirmarPass = (<HTMLInputElement>document.getElementById('confirmarPass')).value;

    if (nombreUsuario.trim() === '' || selectRol === 'Seleccione una opción' || passwordUsuario.trim() === '' || confirmarPass.trim() === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique que los campos esten llenos',
        showConfirmButton: false,
        timer: 1500
      });
      return false; // Hay campos vacíos
    }

    return true; // No hay campos vacíos
  }

  validarNameUsuario(): boolean {
    let existNameUsuario;
    let ban: boolean = true
    this.usuarioService.existUserName(String(this.usuarioData.nombreUsuario)).subscribe(
      (data) => {
        existNameUsuario = !!data;
        if (existNameUsuario) {
          Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'nombre de usuario ya registrado',
            showConfirmButton: false,
            timer: 1500,
          });
          ban = false
        }
      }
    )
    return ban
  }


  validarnombre(): boolean {
    let ban: boolean = true
    if (/^\d+$/.test(String(this.personaObject.nombre1))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique que los nombres esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false
    } else if (/^\d+$/.test(String(this.personaObject.nombre2))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique que los nombres esten correctos',
        showConfirmButton: false,
        timer: 1500
      });
      ban = false
    }
    return ban
  }

  validarapellido(): boolean {
    let ban: boolean = true
    if (/^\d+$/.test(String(this.personaObject.apellido1))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique que los apellidos esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    } else if (/^\d+$/.test(String(this.personaObject.apellido2))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique que los apellidos esten correctos',
        showConfirmButton: false,
        timer: 1500
      });
      ban = false
    }
    return ban;
  }

  validarcedula(): boolean {
    let ban: boolean = true
    if (!/^\d+$/.test(String(this.personaObject.cedula)) || (!/^\d{10}$/.test(String(this.personaObject.cedula)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'La cédula es incorrecta',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }
    return ban
  }

  validarcelular(): boolean {
    let ban: boolean = true
    if (!/^\d+$/.test(String(this.personaObject.celular)) || (!/^\d{10}$/.test(String(this.personaObject.celular)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
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

    if (!regexCorreo.test(String(this.personaObject.correo))) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
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
    const cedulaValido = this.validarcedula();
    const edadValida = this.validaredad();

    return celularValido && correoValido && nombreValido && apellidoValido && cedulaValido && edadValida;

  }

  validarConfirmar(): boolean {
    let ban: boolean = true;
    if (this.confirmarPass !== this.usuarioData.passwordUsuario) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Deben coincidir las contraseñas',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }

    return ban
  }
  validaredad(): boolean {
    let ban: boolean = true;
    let fechaActual = new Date();
    let edadMinima = 18;


    if (this.calcularEdad() < edadMinima) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debe ser mayor a 18 años',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;

    }
    return ban
  }

  //edad
  calcularEdad(): number {
    if (!this.cedulaRegistrada) {
      const fechaActual: Date = new Date();
      const anioActual: number = fechaActual.getFullYear();
      const mesActual: number = fechaActual.getMonth() + 1;
      const diaActual: number = fechaActual.getDate();

      const nacimiento: Date = new Date(String(this.personaObject.fnacimiento));
      const anioNacimiento: number = nacimiento.getFullYear();
      const mesNacimiento: number = nacimiento.getMonth() + 1;
      const diaNacimiento: number = nacimiento.getDate() + 1;
      // console.log("nacimiento" + nacimiento)

      let edad: number = anioActual - anioNacimiento;

      // Verificar si aún no ha cumplido años en el presente año
      if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
      }
      // console.log("EDAD" + edad)

      return edad;

    } else {
      return 18;
    }
  }
}
