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
import { SfotosNoticiasService } from 'src/app/services/s-fotosNoticias.service';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';

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
  contadorFotos: number = 0;
  contadorParrafos: number = 0;
  limiteFotosAlcanzado = false;
  accionCompletada = false;
  noticias: Noticias = new Noticias();
  fotosNoticias: FotosNoticias = new FotosNoticias();
  empresas: Empresas = new Empresas();
  nombreEmpresa: string = 'Nunakay'; // Cambia el nombre de la empresa según tu necesidad
  idNoticia: number = 0;
  parrafoInput: string = '';
  parrafos: Parrafos = new Parrafos();
  fotosNoticiasUrls: string[] = [];

  cuerpoUrlFoto: string = baserUrlImagenes;

  listaParrafo: Parrafos[] = [];
  listaImagenesNoticias: FotosNoticias[] = [];




  parrafoObject: Parrafos = new Parrafos;

  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private noticiasServices: SnoticiasService,
    private loginServices: SloginService,
    private fotoServices: SfotosService,
    private router: Router,
    private parrafosServices: SParrafosService,
    private fotosNoticiasServices: SfotosNoticiasService
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
      console.log(this.procesarFoto)
    }

  }

  borrarImagen() {
    this.obtenerFoto.value = '';
    this.procesarFoto = null;
    this.imagenPreview = null;
  }

  // paseSiguiente1() {
  //   this.submitted = true;
  // }

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
  //FOTONOTICIAS

  guardarNoticias() {
    const formData = new FormData();
    formData.append('file', this.procesarFoto);
    this.fotoServices.postFotos(formData).subscribe(respuesta => {
      // Asignar la URL de la imagen
      console.log(respuesta.url)
      this.noticias.portadaNoticia = respuesta.url;
      // guardar foto
      this.noticiasServices.postNoticias(this.noticias, this.nombreEmpresa).subscribe(
        (data) => {
          if (data != null) {
            this.noticias = data;
            console.log(this.noticias)
            Swal.fire({
              position: 'top-right',
              icon: 'success',
              title: 'Datos noticia guardados exitosamente',
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
  }

  almacenarFotoNoticia() {
    // Verificar si se ha alcanzado el límite de 5 fotos
    if (this.contadorFotos >= 5) {
      // Mostrar una notificación de error
      Swal.fire({
        title: 'No se pueden añadir más fotos',
        text: 'Ya se han agregado 5 fotos',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      this.limiteFotosAlcanzado = true;
      return; // Salir del método si se alcanza el límite
    } else {
      const formData = new FormData();
      formData.append('file', this.procesarFoto);
      this.fotoServices.postFotos(formData).subscribe(respuesta => {
        // Asignar la URL de la imagen
        console.log(respuesta.url);
        this.fotosNoticias.fotosNoticia = respuesta.url;
        console.log(this.fotosNoticias);
        this.subirFotosNoticias();
        // Incrementar el contador después de almacenar la foto
        this.contadorFotos++;
      }, error => {
        // Mostrar una notificación de error
        alert('No se pudo subir la imagen');
      });

    }


  }

  getImagenesNoticias() {
    let activos: number = 0;
    let listaTrue: FotosNoticias[] = [];

    this.fotosNoticiasServices.getImagenes(this.noticias.idNoticia).subscribe(
      data => {
        this.listaImagenesNoticias = data;
        console.log(this.listaImagenesNoticias)

        for (let lista of this.listaImagenesNoticias) {
          if (lista.estFotosNoticia == true) {
            listaTrue.push(lista);
            activos = activos + 1;
          }
        }
      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  //FOTOSNOTICIAS

  subirFotosNoticias() {
    console.log(this.idNoticia);
    console.log(this.fotosNoticias)
    this.fotosNoticiasServices.postFotosNoticias(this.fotosNoticias, Number(this.noticias.idNoticia)).subscribe(resultado => {
      console.log(this.idNoticia);
      this.getImagenesNoticias();

      // Mostrar una notificación de éxito
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Fotos de Noticia subidas exitosamente',
        showConfirmButton: false,
        timer: 1500,
        background: '#ffff',
        iconColor: '#4CAF50',
        padding: '1.25rem',
        width: '20rem',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }, error => {
      // Mostrar una notificación de error
      Swal.fire({
        title: 'No se pudo guardar',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    });
  }

  //FOTOSNOTICIAS

//parrafos

  guardarparrafos() {
    if (this.contadorParrafos >= 10) {
      Swal.fire({
        title: 'No se pueden añadir más de 10 párrafos, continue con fotos noticias',
        text: 'Ya se han agregado 10 párrafos',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    } else {
      console.log(this.parrafos);
      console.log(this.noticias.idNoticia)
      this.parrafosServices.postParrafo(this.parrafos, Number(this.noticias.idNoticia)).subscribe(
        (data) => {
          this.parrafos = data;
          this.listaParrafo.push(this.parrafos); // Agrega el párrafo a la lista
          console.log(this.parrafos);
          this.getParrafos();
          Swal.fire({
            title: 'Parrafo agregado exitosamente párrafo',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
          this.contadorParrafos++;
          this.parrafos = {}; // Limpiar el valor de this.parrafo        
        },
        (error) => {
          // Mostrar una notificación de error
          Swal.fire({
            title: 'No se pudo agregar párrafo',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );
    }

  }
  getParrafos() {
    this.parrafosServices.getParrafos(this.noticias.idNoticia).subscribe(
      data => {
        this.listaParrafo = data;

      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }
  //parrafos

}


