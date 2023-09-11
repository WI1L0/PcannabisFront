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
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';

@Component({
  selector: 'app-crear-noticias',
  templateUrl: './crear-noticias.component.html',
  styleUrls: ['./crear-noticias.component.scss'],
})
export class CrearNoticiasComponent implements OnInit {

  public submitted: boolean = false;

  noticias: Noticias = new Noticias();

  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;

  limiteFotosAlcanzado: boolean = false;

  parrafosObjects: Parrafos = new Parrafos();
  listaParrafo: Parrafos[] = [];
  contSaveParrafos: number = 0;
  public parrafosCompletos: boolean = false;

  public mensajeParrafos: string = "Necesita agregar al menos un párrafo";

  fotosNoticiasObjects: FotosNoticias = new FotosNoticias();
  fotosNoticiasUrls: string[] = [];

  estadoSaveUpdate: boolean = false;

  cuerpoUrlFoto: string = baserUrlImagenes;

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
      this.router.navigate(['/cbd/login']);
    }
  }
  verificarParrafosCompletos() {
    this.parrafosCompletos = this.listaParrafo.length > 0 && this.listaParrafo.every(parrafo => parrafo.parrafo && parrafo.parrafo.trim() !== '');
  
    if (!this.parrafosCompletos) {
      this.mensajeParrafos = "Necesita agregar al menos un párrafo";
    } else {
      this.mensajeParrafos = "";
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


  almacenarListParrafos(parra: Parrafos) {
    if (parra.parrafo != null && parra.parrafo != '' && parra.parrafo !== undefined) {
      this.parrafosObjects = {} as Parrafos;
      parra.idParrafo = this.listaParrafo.length + 1;
      this.listaParrafo.push(parra);
      this.parrafosCompletos = this.listaParrafo.length > 0;
    }
  }

  // //FOTONOTICIAS

  almacenarNoticiaParrafos() {
    this.estadoSaveUpdate = true;
    if (this.listaParrafo.length != 0) {
      this.almacenarFoto().then(
        (url) => {
          this.noticias.portadaNoticia = url;
          if (this.noticias.portadaNoticia != null) {
            if (this.noticias.fechaNoticia &&
              this.noticias.preDescripcionNoticia &&
              this.noticias.tituloNoticia &&
              this.noticias.ubicacionNoticia) {
              this.noticiasServices.postNoticias(this.noticias, nameEmpresa).subscribe(
                (data) => {
                  if (data != null) {
                    this.borrarImagen();
                    this.noticias = data;
                    for (let a = 0; a < this.listaParrafo.length; a++) {
                      this.parrafosServices.postParrafo(this.listaParrafo[a], Number(data.idNoticia)).subscribe(
                        (data) => {
                          if (data != null) {
                            this.contSaveParrafos++;
                            if (a == this.listaParrafo.length) {
                              if (this.contSaveParrafos != this.listaParrafo.length) {
                                this.estadoSaveUpdate = false;
                                Swal.fire({
                                  position: 'top-right',
                                  icon: 'warning',
                                  title: 'No se pudo crear todo intenta nuevamente',
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
                                this.estadoSaveUpdate = false;
                                Swal.fire({
                                  position: 'top-right',
                                  icon: 'success',
                                  title: 'Se creo exitosamente',
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
                        }
                      )
                    }
                  } else {
                    this.estadoSaveUpdate = false;
                    Swal.fire({
                      position: 'top-right',
                      icon: 'error',
                      title: 'No se pudo crear intenta nuevamente',
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
                }
              );
            } else {
              this.estadoSaveUpdate = false;
              Swal.fire({
                position: 'top-right',
                icon: 'warning',
                title: 'Verifique que todos los datos esten ingresados',
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
          } else {
            this.estadoSaveUpdate = false;
            Swal.fire({
              position: 'top-right',
              icon: 'error',
              title: 'No se pudo crear intentar nuevamente',
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
    } else {
      this.estadoSaveUpdate = false;
      Swal.fire({
        position: 'top-right',
        icon: 'warning',
        title: 'No se pudo crear sin parrafos',
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


  almacenarNoticiaFotos() {
    this.limiteFotosAlcanzado = true;
    if (this.fotosNoticiasUrls.length != 5) {
      this.almacenarFoto().then(
        (url) => {
          this.fotosNoticiasObjects.fotosNoticia = url;
          if (this.fotosNoticiasObjects.fotosNoticia != null) {
            this.fotosNoticiasServices.postFotosNoticias(this.fotosNoticiasObjects, Number(this.noticias.idNoticia)).subscribe(
              (data) => {
                if (data != null) {
                  this.limiteFotosAlcanzado = false;
                  this.borrarImagen();
                  this.fotosNoticiasUrls.push(String(data.fotosNoticia));
                  Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'creada exitosamente',
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
                  Swal.fire({
                    position: 'top-right',
                    icon: 'error',
                    title: 'No se pudo crear intentar nuevamente',
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
    } else {
      Swal.fire({
        position: 'top-right',
        icon: 'warning',
        title: 'No se puede almacenar mas fotos',
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

  fin() {
    if (this.fotosNoticiasUrls.length != 0) {
      this.borrarImagen();
      this.listaParrafo = [];
      this.fotosNoticiasUrls = [];
      this.parrafosObjects = {} as Parrafos;
      this.fotosNoticiasObjects = {} as FotosNoticias;
      this.limiteFotosAlcanzado = false;
      history.back();
    } else {
      Swal.fire({
        title: 'No puede almacenarse la noticia sin fotos ',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }


}





