import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/modelos/Empresas';
import { Fotos } from 'src/app/modelos/Fotos';
import { FotosNoticias } from 'src/app/modelos/FotosNoticias';
import { Noticias } from 'src/app/modelos/Noticias';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SEmpresasService } from 'src/app/services/s-empresas.service';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SnoticiasService } from 'src/app/services/s-noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-noticias',
  templateUrl: './crear-noticias.component.html',
  styleUrls: ['./crear-noticias.component.scss'],
})
export class CrearNoticiasComponent implements OnInit {

  public submitted: boolean = false;

  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;
  objectNoticia = new Noticias();

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private noticiasServices: SnoticiasService,
    private loginServices: SloginService,
    private fotoServices: SfotosService,
    private router: Router,
    private empresasServices: SEmpresasService
  ) {
    AllScripts.Cargar(['paginas/crearnoticias']);
  }
  // noticias: Noticias = new Noticias();
  noticias: Noticias = {
    tituloNoticia: '',
    fechaNoticia: '',
    ubicacionNoticia: '',
    preDescripcionNoticia: '',
  };
  empresas: Empresas = new Empresas();

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
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

  borrarImagen() {
    // window.miFuncionmensaje();
    this.obtenerFoto.value = '';
    this.procesarFoto = null;
    this.imagenPreview = null;
  }

  paseSiguiente1() {
    this.submitted = true;
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

  crearalert() {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'Noticia Creada Exitosamente',
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
  dtos: Noticias = {


    // Define aquí los campos de la noticia que desees guardar
  };
  nombreEmpresa: string = 'Nunakay'; // Cambia el nombre de la empresa según tu necesidad

  guardarNoticias() {
    console.log('Guardando noticias:', this.noticias);
    this.noticiasServices.postNoticias(this.noticias,this.nombreEmpresa).subscribe(resultado => {
      // Mostrar una notificación de éxito
      alert('Noticia guardada exitosamente');
    }, error => {
      // Mostrar una notificación de error
      alert('No se pudo guardar la noticia');
    });
  }
  hola(){
    console.log("holaaaaaaaaaaaaaaa")
  }


}


