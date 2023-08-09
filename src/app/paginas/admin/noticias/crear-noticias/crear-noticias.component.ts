import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/modelos/Empresas';
import { Fotos } from 'src/app/modelos/Fotos';
import { FotosNoticias } from 'src/app/modelos/FotosNoticias';
import { Noticias } from 'src/app/modelos/Noticias';
import { Parrafos } from 'src/app/modelos/Parrafos';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { SEmpresasService } from 'src/app/services/s-empresas.service';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SnoticiasService } from 'src/app/services/s-noticias.service';
import { SParrafosService } from 'src/app/services/s-parrafos.service';
import Swal from 'sweetalert2';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

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
  noticias: Noticias = new Noticias();
  empresas: Empresas = new Empresas();
  nombreEmpresa: string = 'Nunakay'; // Cambia el nombre de la empresa según tu necesidad
  idNoticia: number = 0;
  parrafoInput: string = '';
  listaParrafos: string[] = [];
  parrafos: Parrafos = new Parrafos();

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private noticiasServices: SnoticiasService,
    private loginServices: SloginService,
    private fotoServices: SfotosService,
    private router: Router,
    private parrafosServices: SParrafosService
  ) {
    AllScripts.Cargar(['paginas/crearnoticias']);
  }



  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/jj']);
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


  guardarNoticias() {
    if (this.listaParrafos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.procesarFoto);

      this.fotoServices.postFotos(formData).subscribe(respuesta => {
        // Asignar la URL de la imagen
        this.noticias.portadaNoticia = respuesta.url;
        // guardar foto
        this.noticiasServices.postNoticias(this.noticias, this.nombreEmpresa).subscribe(resultado => {
          const idNoticia = resultado.idNoticia; // Capturar el ID de la noticia
          console.log(idNoticia);
          // Mostrar una notificación de éxito
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
          if (idNoticia !== undefined) {
            console.log('ID de la noticia:', idNoticia);
            this.registrarNoticia(idNoticia);
          } else {
            console.error('El ID de la noticia es undefined');
          }
        }, error => {
          // Mostrar una notificación de error
          Swal.fire({
            title: 'No se pudo guardar',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          })
        });
      }, error => {
        // Mostrar una notificación de error
        alert('No se pudo subir la imagen');
      });
    } else {
      // Mostrar una notificación de error
      Swal.fire({
        title: 'No se puede guardar una noticia sin parrafos',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  registrarNoticia(idNoticia: number) {
    this.listaParrafos.forEach(parrafo => {
      this.guardarParrafo(parrafo, idNoticia);
    });
  }

  guardarParrafo(parrafo: string, idNoticia: number) {
    const parrafosObj: Parrafos = {
      parrafo: parrafo
    };

    this.parrafosServices.postParrafo(parrafosObj, idNoticia).subscribe(
      resultado => {
        console.log({ parrafo });
      }
    );
  }

  guardarParrafos(idNoticia: number) {
    console.log(this.listaParrafos);
    this.listaParrafos.forEach(parrafo => {
      this.guardarParrafo(parrafo, idNoticia);
    });
  }

  agregarParrafo() {
    if (this.parrafoInput && this.parrafoInput.trim() !== '') {
      const nuevoParrafo = this.parrafoInput; // Almacenar el valor en una variable temporal
      this.listaParrafos.push(nuevoParrafo);
      this.parrafoInput = '';
      console.log(this.listaParrafos);
      const idNoticia = this.noticias.idNoticia || 0;
      // Llamar a la función guardarParrafos() con la lista actualizada de párrafos
      this.guardarParrafos(idNoticia);
    }

  }
}

