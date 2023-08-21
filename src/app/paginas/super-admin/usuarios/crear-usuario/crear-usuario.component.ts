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
        title: 'La contrase;a debe tener minimo una Mayuscula, Minuscula, un numero un caracter y 8 dijitos',
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

  almacenarUsuario() {
    this.almacenarFoto().then(
      (url) => {
        this.usuarioData.fotoUsuario = url;
      }
    )
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
}

