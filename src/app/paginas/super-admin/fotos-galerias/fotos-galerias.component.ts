import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fotos } from 'src/app/modelos/Fotos';
import { FotosEmpresas } from 'src/app/modelos/FotosEmpresas';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SfotosEmpresasService } from 'src/app/services/s-fotosEmpresas.service';
import { SloginService } from 'src/app/services/s-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotos-galerias',
  templateUrl: './fotos-galerias.component.html',
  styleUrls: ['./fotos-galerias.component.scss']
})
export class FotosGaleriasComponent implements OnInit {

  FotosEmpresasList: FotosEmpresas[] = [];
  // listFotosEmpresa: FotosEmpresasResponse = new FotosEmpresasResponse();

  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;

  btnEquipo: boolean = true;
  btnAdministrativo: boolean = false;
  btnNunakay: boolean = false;

  guardarsi: boolean = true;

  estadoSaveUpdate: boolean = false;
  // CUERPO DE LA URL IMAGENES
  cuerpoUrlFoto: string = baserUrlImagenes;

  rolSuperAdmin: boolean = false;

  FotoEmpresasObject: FotosEmpresas = new FotosEmpresas();

  constructor(
    private loginServices: SloginService,
    private router: Router,
    private fotoServices: SfotosService,
    private fotosEmpresasServices: SfotosEmpresasService,
  ) {
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }

    const rolSuperAdministrador = localStorage.getItem('rolAdministrador');
    this.rolSuperAdmin = rolSuperAdministrador ? JSON.parse(rolSuperAdministrador) : false;

    if (this.rolSuperAdmin) {
      this.obtenerFotos('Equipo');
    } else {
      this.router.navigate(['/cbd/panel']);
    }
  }

  // MOSTRAR FOTOS
  obtenerFotos(tipo: string) {
    let veri;
    this.limpiarAll();
    this.fotosEmpresasServices.getFotosEmpresasVerificacion(nameEmpresa, tipo).subscribe(
      (verificacion) => {
        if (verificacion != null) {
          veri = !!verificacion;
          if (veri) {
            this.fotosEmpresasServices.getFotosEmpresas(nameEmpresa, tipo).subscribe(
              (data) => {
                if (data != null) {
                  this.FotosEmpresasList = data;
                  if (this.FotosEmpresasList.length < 4 && tipo != 'Administrativo') {
                    this.guardarsi = false;
                  } else if (tipo === 'Administrativo') {
                    this.guardarsi = false;
                  } else {
                    this.guardarsi = true;
                  }
                }
              },
              (error) => {
                console.log('Error al obtener Fotos Empresas:', error);
              }
            );
          } else {
            this.guardarsi = false;
          }
        }
      }
    )

  }
  // MOSTRAR FOTOS

  // LIMPIAR LISTAS VARIABLES
  limpiarAll() {
    // this.listFotosEmpresa = {} as FotosEmpresasResponse;
    this.FotosEmpresasList = [];
  }
  // LIMPIAR LISTAS VARIABLES

  deleteFotos(ft: FotosEmpresas) {
    let veri1;
    let veri2;
    this.fotoServices.deleteFotos(String(ft.fotoEmpresa)).subscribe(
      (datafo) => {
        veri1 = !!datafo;
        if (veri1) {
          this.fotosEmpresasServices.deleteFotosEmpresas(Number(ft.idFotoEmpresa)).subscribe(
            (data) => {
              veri2 = !!data;
              if (veri2) {
                Swal.fire({
                  position: 'top-right',
                  icon: 'success',
                  title: 'foto eliminada correctamente',
                  showConfirmButton: false,
                  timer: 1500,
                  background: '#ffff',
                  iconColor: '#4CAF50',
                  padding: '1.25rem',
                  width: '20rem',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
                this.ObtenerFotosRecargar();
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
              resolve(nameFoto.url);
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

  preSaveFotosEmpresas() {
    let cont = this.FotosEmpresasList.length;
    this.estadoSaveUpdate = true;
    let categoria = '';

    if (this.btnNunakay) {
      categoria = 'Nunakay';
    } else if (this.btnAdministrativo) {
      categoria = 'Administrativo';
    } else if (this.btnEquipo) {
      categoria = 'Equipo';
    }

    if (cont < 4 && categoria != 'Administrativo') {
      this.saveFotosEmpresas(categoria);
    }

    if (categoria === 'Administrativo') {
      this.saveFotosEmpresas(categoria);
    }

  }

  saveFotosEmpresas(categoria: string) {
    this.almacenarFoto().then(
      (url) => {
        if (url != null) {
          this.FotoEmpresasObject.fotoEmpresa = url;

          this.FotoEmpresasObject.categoriaFotoEmpresa = categoria;
          this.fotosEmpresasServices.saveFotosEmpresas(this.FotoEmpresasObject, nameEmpresa).subscribe(
            (data) => {
              if (data != null) {
                this.estadoSaveUpdate = false;
                Swal.fire({
                  position: 'top-right',
                  icon: 'success',
                  title: 'guardado correctamente',
                  showConfirmButton: false,
                  timer: 1500,
                  background: '#ffff',
                  iconColor: '#4CAF50',
                  padding: '1.25rem',
                  width: '20rem',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
                this.borrarImagen();
                this.ObtenerFotosRecargar()
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

  }

  gtnBtn(tipo: string) {
    if (tipo === 'N') {
      this.btnNunakay = !this.btnNunakay;
      this.obtenerFotos('Nunakay');
      if (this.btnNunakay) {
        this.btnEquipo = false;
        this.btnAdministrativo = false;
      }
    } else if (tipo === 'A') {
      this.btnAdministrativo = !this.btnAdministrativo;
      this.obtenerFotos('Administrativo');
      if (this.btnAdministrativo) {
        this.btnEquipo = false;
        this.btnNunakay = false;
      }
    } else if (tipo === 'E') {
      this.btnEquipo = !this.btnEquipo;
      this.obtenerFotos('Equipo');
      if (this.btnEquipo) {
        this.btnNunakay = false;
        this.btnAdministrativo = false;
      }
    }
  }

  ObtenerFotosRecargar() {
    if (this.btnNunakay) {
      this.obtenerFotos('Nunakay');
    } else if (this.btnAdministrativo) {
      this.obtenerFotos('Administrativo');
    } else if (this.btnEquipo) {
      this.obtenerFotos('Equipo');
    }
  }
}
