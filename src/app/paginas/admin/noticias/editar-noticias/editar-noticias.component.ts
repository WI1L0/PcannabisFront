import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Fotos } from 'src/app/modelos/Fotos';
import { FotosNoticias } from 'src/app/modelos/FotosNoticias';
import { Noticias } from 'src/app/modelos/Noticias';
import { Parrafos } from 'src/app/modelos/Parrafos';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SfotosNoticiasService } from 'src/app/services/s-fotosNoticias.service';
import { SnoticiasService } from 'src/app/services/s-noticias.service';
import { SParrafosService } from 'src/app/services/s-parrafos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-noticias',
  templateUrl: './editar-noticias.component.html',
  styleUrls: ['./editar-noticias.component.scss']
})
export class EditarNoticiasComponent implements OnInit {
  noticia: Noticias = new Noticias();
  parrafo: Parrafos = new Parrafos();
  fotosNoticias: FotosNoticias = new FotosNoticias();
  parrafoInput: string = '';
  listaParrafos: Parrafos[] = [];
  nuevoParrafo: string = '';
  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;
  editFoto: boolean = false;
  cuerpoUrlFoto: string = baserUrlImagenes;
  contadorParrafos: number = 0;

  listaImagenesNoticias: FotosNoticias[] = [];
  //implementar js en los componentes
  constructor(
    private AllScripts: AllScriptsService,
    private sanitizer: DomSanitizer,
    private noticiasServices: SnoticiasService,
    private fotoServices: SfotosService,
    private router: Router,
    private parrafosServices: SParrafosService,
    private fotosNoticiasServices: SfotosNoticiasService) {
    AllScripts.Cargar(["paginas/editarnoticia"]);
  }
  ngOnInit(): void {
    this.getNoticiaADetalle();
    this.getImagenesNoticias()
  }



  //editar
  getNoticiaADetalle() {
    const not = localStorage.getItem('noticiaAdm');
    if (not != null) {
      this.noticia = JSON.parse(not);
      this.getParrafos();
    } else {
      // history.back();
      this.router.navigate(['/cbd/admin/noticias/listar']);
    }
  }

  getParrafos() {
    this.parrafosServices.getParrafos(this.noticia.idNoticia).subscribe(
      data => {
        this.listaParrafos = data;

      },
      error => {
        console.log('Error al obtener noticias:', error);
      }
    );
  }

  getImagenesNoticias() {
    let activos: number = 0;
    let listaTrue: FotosNoticias[] = [];

    this.fotosNoticiasServices.getImagenes(this.noticia.idNoticia).subscribe(
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

  // editarnoticia() {
  //   console.log(this.noticia.idNoticia)
  //   console.log(this.listaParrafos)
  //   this.almacenarFoto().then(
  //     (url) => {
  //       this.noticia.portadaNoticia = url;
  //       console.log(url)
  //       console.log(this.noticia)
  //       console.log(this.noticia.portadaNoticia+"jnj jnjnj njnj")
  //       console.log(this.noticia)
      
  //     this.noticiasServices.putNoticias(this.noticia, Number(this.noticia.idNoticia)).subscribe(
  //       (data) => {
  //         if (data != null) {
  //           Swal.fire({
  //             position: 'top-right',
  //             icon: 'success',
  //             title: 'Noticia editada exitosamente',
  //             showConfirmButton: false,
  //             timer: 1500,
  //             background: '#ffff',
  //             iconColor: '#4CAF50',
  //             padding: '1.25rem',
  //             width: '20rem',
  //             allowOutsideClick: false,
  //             allowEscapeKey: false,
  //           });

  //         }
  //       }, error => {
  //         // Mostrar una notificación de error
  //         Swal.fire({
  //           title: 'No se pudo guardar',
  //           icon: 'warning',
  //           showCancelButton: false,
  //           confirmButtonColor: '#3085d6',
  //           cancelButtonColor: '#d33',
  //           confirmButtonText: 'OK'
  //         })
  //       });
    
  // console.log(this.noticia)
  // console.log(this.noticia.portadaNoticia)
  //     }
  //   )

  // }


  editarnoticia() {
    console.log(this.noticia.idNoticia);
    console.log(this.listaParrafos);
    this.almacenarFoto().then(
      (url) => {
        this.noticia.portadaNoticia = url;
        console.log(url);
        console.log(this.noticia);
        console.log(this.noticia.portadaNoticia + "jnj jnjnj njnj");
        console.log(this.noticia);
  
        // Realiza el put incluso si no se edita la imagen
        this.guardarNoticia();
      }
    );
  }
  
  guardarNoticia() {
    this.noticiasServices.putNoticias(this.noticia, Number(this.noticia.idNoticia)).subscribe(
      (data) => {
        if (data != null) {
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Noticia editada exitosamente',
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
      },
      (error) => {
        // Mostrar una notificación de error
        Swal.fire({
          title: 'No se pudo guardar',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  editarparrafos(parrafo: Parrafos) {
    console.log(this.noticia.idNoticia)
    console.log(this.noticia)
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    console.log(parrafo)
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

    this.parrafosServices.putParrafo(parrafo, Number(parrafo.idParrafo)).subscribe(
      (data) => {
        if (data != null) {
          this.parrafo = data
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Parrafos editados exitosamente',
            showConfirmButton: false,
            timer: 1500,
            background: '#ffff',
            iconColor: '#4CAF50',
            padding: '1.25rem',
            width: '20rem',
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          this.parrafo = {};
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
  }

  eliminarParrafos(parrafo: Parrafos) {
    this.parrafosServices.deleteParrafos(Number(parrafo.idParrafo)).subscribe(
      (data) => {
        // if (data != null) {
        this.parrafo = data
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Parrafos eliminados exitosamente',
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
          title: 'No se pudo eliminar',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      });
  }

  guardarparrafos() {
    console.log(this.parrafo);
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

      this.parrafosServices.postParrafo(this.parrafo, Number(this.noticia.idNoticia)).subscribe(
        (data) => {
          this.parrafo = data;
          this.listaParrafos.push(this.parrafo); // Agrega el párrafo a la lista
          console.log(this.parrafo);
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
          this.parrafo = {};
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

  //foto
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
  almacenarFotoNoticia() {
    const formData = new FormData();
    formData.append('file', this.procesarFoto);
    this.fotoServices.postFotos(formData).subscribe(respuesta => {
      // Asignar la URL de la imagen
      console.log(respuesta.url);
      this.fotosNoticias.fotosNoticia = respuesta.url;
      console.log(this.fotosNoticias);
      this.subirFotosNoticias();
    }, error => {
      // Mostrar una notificación de error
      alert('No se pudo subir la imagen');
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

  eliminarfotosNoticias(fotoNoticia: FotosNoticias) {
    console.log(fotoNoticia)
    this.fotosNoticiasServices.deleteFotosNoticias(Number(fotoNoticia.idFotosNoticia)).subscribe(
      (data) => {
        // if (data != null) {

        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Fotos noticias eliminadas exitosamente',
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
        this.getImagenesNoticias();
        // Mostrar una notificación de error
        Swal.fire({
          title: 'No se pudo eliminar',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      });
  }

  subirFotosNoticias() {
    this.fotosNoticiasServices.postFotosNoticias(this.fotosNoticias, Number(this.noticia.idNoticia)).subscribe(resultado => {
      console.log(this.noticia.idNoticia);
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



}



