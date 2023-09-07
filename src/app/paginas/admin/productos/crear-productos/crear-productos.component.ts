import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fotos } from 'src/app/modelos/Fotos';
import { Productos } from 'src/app/modelos/Productos';
import { nameEmpresaProductos } from 'src/app/services/defauld/EmpresaName';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SproductosService } from 'src/app/services/s-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss']
})
export class CrearProductosComponent implements OnInit {

  productosObject: Productos = new Productos();
  public submitted: boolean = true;

  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;

  estadoSaveUpdate:boolean = false;

  //implementar js en los componentes
  constructor(
    private productosServices: SproductosService,
    private loginServices: SloginService,
    private fotoServices: SfotosService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }

  }

  saveProductos() {
    this.submitted = true;
    this.estadoSaveUpdate = true;
    if (this.productosObject.nombreProducto &&
      this.productosObject.preDescripcionProducto &&
      this.productosObject.descripcionProducto &&
      this.imagenPreview) {
      this.almacenarFoto().then(
        (url) => {
          this.productosObject.portadaProducto = url;
          if (this.productosObject.portadaProducto != null) {
            this.productosServices.postProductos(this.productosObject, nameEmpresaProductos).subscribe(
              (data) => {
                if (data != null) {
                  this.estadoSaveUpdate = false;
                  Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'Producto Creado Exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#ffff',
                    iconColor: '#4CAF50',
                    padding: '1.25rem',
                    width: '20rem',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                  history.back();
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

  salir() {
    history.back();
  }
}