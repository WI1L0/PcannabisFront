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
  contadorFotos:number = 0;
  contadorParrafos:number = 0;
  limiteFotosAlcanzado = false;
  accionCompletada=false;
  noticias: Noticias = new Noticias();
  fotosNoticias: FotosNoticias = new FotosNoticias();
  empresas: Empresas = new Empresas();
  nombreEmpresa: string = 'Nunakay'; // Cambia el nombre de la empresa según tu necesidad
  idNoticia: number = 0;
  parrafoInput: string = '';
  listaParrafos: string[] = [];
  parrafos: Parrafos = new Parrafos();
  fotosNoticiasUrls: string[] = [];

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
  guardarfotos() {

  }


  //NOTICIAS

  guardarNoticias() {
    if (this.listaParrafos.length > 0) {
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

              this.registrarNoticia(Number(data.idNoticia));

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
  }else{
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

  subirFotosNoticias() {
    console.log(this.idNoticia);
    console.log(this.fotosNoticias)
    this.fotosNoticiasServices.postFotosNoticias(this.fotosNoticias, Number(this.noticias.idNoticia)).subscribe(resultado => {
      console.log(this.idNoticia);

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

  registrarNoticia(idNoticia: number) {
    this.listaParrafos.forEach(parrafo => {
      this.guardarParrafo(parrafo, idNoticia);
    });
  }

  guardarParrafo(parrafo: string, idNoticia: number) {
    this.parrafoObject = {} as Parrafos;
    this.parrafoObject.parrafo = parrafo;
   
    // const parrafosObj: Parrafos = {
    //   parrafo: parrafo
    // };


    this.parrafosServices.postParrafo(this.parrafoObject, idNoticia).subscribe(
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

  // agregarParrafo() {
  //   if(this.contadorParrafos>=10){
  //     Swal.fire({
  //       title: 'No se pueden añadir más de 10 parrafos',
  //       text: 'Ya se han agregado 10 parrados',
  //       icon: 'warning',
  //       showCancelButton: false,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'OK'
  //     });
  //   }else{
  //     if (this.parrafoInput && this.parrafoInput.trim() !== '') {
  //       const nuevoParrafo = this.parrafoInput; // Almacenar el valor en una variable temporal
  //       this.listaParrafos.push(nuevoParrafo);
  //       this.parrafoInput = '';
  //       console.log(this.listaParrafos);
  //       const idNoticia = this.noticias.idNoticia || 0;
  //       // Llamar a la función guardarParrafos() con la lista actualizada de párrafos
  //       this.guardarParrafos(idNoticia);
  //       this.contadorParrafos++;
  //       this.accionCompletada = true;
  //     }
  //   }
    

  // }
  agregarParrafo() {
    if (this.contadorParrafos >= 10) {
      Swal.fire({
        title: 'No se pueden añadir más de 10 párrafos',
        text: 'Ya se han agregado 10 párrafos',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    } else {
      if (this.parrafoInput && this.parrafoInput.trim() !== '') {
        const nuevoParrafo: string = this.parrafoInput;
        this.listaParrafos = [...this.listaParrafos, nuevoParrafo]; // Agregar el nuevo párrafo a la lista sin modificar los existentes
        this.parrafoInput = '';
        console.log(this.listaParrafos);
        const idNoticia = this.noticias.idNoticia || 0;
        this.guardarParrafos(idNoticia);
        this.contadorParrafos++;
        this.accionCompletada = true;
      }
    }
  }


  //fotos




}


