import { Component, OnInit } from '@angular/core';
import { Fotos } from 'src/app/modelos/Fotos';
import { Personas } from 'src/app/modelos/Personas';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import nameEmpresa from 'src/app/services/defauld/EmpresaName';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SfotosNoticiasService } from 'src/app/services/s-fotosNoticias.service';
import { SpersonasService } from 'src/app/services/s-personas.service';
import { SusuariosService } from 'src/app/services/s-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  personaObject: Personas = new Personas();
  usuarioData: Usuarios = new Usuarios();
  rolSelect: string = 'ROLE_ADMIN';
  generoSelect: string = '';


  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;


  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private usuarioService: SusuariosService,
    private personasServices: SpersonasService,
    private fotoServices: SfotosService,
  ) {
    AllScripts.Cargar(["paginas/crearusuarios"]);
  }

  ngOnInit(): void {
    // this.personaObject.genero = "Masculino";
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

  almacenarFoto() {
    if (this.procesarFoto) {
      const formData = new FormData();
      formData.append('file', this.procesarFoto, this.procesarFoto.name);

      let nameFoto = new Fotos;
      this.fotoServices.postFotos(formData).subscribe((data) => {
        nameFoto = data;

        console.log(data);
        console.log(nameFoto.url);
        return nameFoto.url;
      });
    }
  }

  borrarImagen() {
    // window.miFuncionmensaje();
    this.obtenerFoto.value = '';
    this.procesarFoto = null;
    this.imagenPreview = null;
  }

  almacenarNew() {
    this.personaObject.genero = this.generoSelect;
    console.log(this.personaObject)
    this.personasServices.postPersona(this.personaObject).subscribe(
      (data) => {
        if (data != null) {
          // this.almacenarFoto
          this.usuarioData.fotoUsuario = String(this.almacenarFoto);
    console.log(this.usuarioData)
          this.usuarioService.guardarUsuarios(Number(data.idPersona), this.rolSelect, nameEmpresa, this.usuarioData).subscribe(
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
              }
            }
          )
        }
      }
    )
  }
}

