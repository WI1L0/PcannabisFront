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

  existCorreo() {
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
            }
          }
        }
      );
    }
  }

  validarContra() {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
    this.valContra = regex.test(String(this.usuarioData.passwordUsuario));
    if (!this.valContra) {
      Swal.fire({
        position: 'top-right',
        icon: 'error',
        title: 'La contraseña debe tener mínimo una mayúscula, minúscula, un número, un caracter y 8 dígitos',
        showConfirmButton: false,
        timer: 1500,
        background: '#ffff',
        iconColor: '#4CAF50',
        padding: '1.25rem',
        width: '20rem',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  }

  almacenarNew() {

    if (this.validaciones()) {
      if (this.valContra) {
        this.almacenarFoto();

        if (this.cedulaRegistrada) {
          this.almacenarUsuario();

        } else {
          if (this.existCorreov == false) {
            this.personaObject.genero = (<HTMLSelectElement>document.getElementById('mySelectGenero')).value;
            this.personasServices.postPersona(this.personaObject).subscribe(
              (data) => {
                if (data != null) {
                  this.personaObject = data;
                  this.almacenarUsuario();
                }
              }
            )
          }
        }
      }
    }
  }

  almacenarUsuario() {
    this.usuarioService.existUserName(String(this.usuarioData.nombreUsuario)).subscribe(
      (data) => {
        if (data != null) {
          let existNameUsuario = !!data;

          if (existNameUsuario) {
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
            this.almacenarFoto().then(
              (url) => {
                this.usuarioData.fotoUsuario = url;
                this.usuarioService.guardarUsuarios(Number(this.personaObject.idPersona), (<HTMLSelectElement>document.getElementById('mySelectRol')).value, nameEmpresa, this.usuarioData).subscribe(
                  (data2) => {
                    if (data2 != null) {
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

                      this.router.navigate(['/cbd/superAdmin/usuarios/listar']);
                    }
                  }
                )
              }
            )

          }
        }
      }
    );
  }

  //VALIDACIONES//

  validaciones(): boolean {
    let ban: boolean = true;
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (/^\d+$/.test(String(this.personaObject.nombre1 && this.personaObject.nombre2))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que los nombres esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false
    }

    if (/^\d+$/.test(String(this.personaObject.apellido1 && this.personaObject.apellido2))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que los apellidos esten correctos',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false
    } else {
      ban = true
    }

    if (!/^\d+$/.test(String(this.personaObject.celular)) || (!/^\d{10}$/.test(String(this.personaObject.celular)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El célular es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    } else {
      ban = true
    }

    if (!/^\d+$/.test(String(this.personaObject.cedula)) || (!/^\d{10}$/.test(String(this.personaObject.cedula)))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'La cédula es incorrecta',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    } else {
      ban = true;
    }

    if (!regexCorreo.test(String(this.personaObject.correo))) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique que el correo este correcto',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }



    //VALIDAR USUARIO
    if (String(this.usuarioData.nombreUsuario).length === 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Complete todos los campos ',
        showConfirmButton: false,
        timer: 1500
      })
      ban = false;
    }

    //Validar edad
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
    //validar edad

    //VALIDACIONES
    return ban;

  }

  //edad
  calcularEdad(): number {
    const fechaActual: Date = new Date();
    const anioActual: number = fechaActual.getFullYear();
    const mesActual: number = fechaActual.getMonth() + 1;
    const diaActual: number = fechaActual.getDate();

    const nacimiento: Date = new Date(String(this.personaObject.fNacimiento));
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
  }
}

