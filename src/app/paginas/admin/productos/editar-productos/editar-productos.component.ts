import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fotos } from 'src/app/modelos/Fotos';
import { Productos } from 'src/app/modelos/Productos';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SproductosService } from 'src/app/services/s-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss']
})
export class EditarProductosComponent implements OnInit {

  public submitted: boolean = false;

  productosObject: Productos = new Productos();
  cuerpoUrlFoto: string = baserUrlImagenes;

  obtenerFoto: any;
  procesarFoto: any;
  imagenPreview: any;
  editFoto: boolean = false;

  constructor(
    private router: Router,
    private fotoServices: SfotosService,
    private productosServices: SproductosService,
    private loginServices: SloginService,
  ) {
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }
    // if (Object.keys(this.contactanosObject).length === 0) {
    //   this.router.navigate(['/cbd/admin/contactanos/listar']);
    // }
    this.obtenerProductos();
  }

  obtenerProductos() {
    // limpiar
    this.productosObject = {} as Productos;

    const producto = localStorage.getItem('productoAdm');
    if (producto != null) {
      this.productosObject = JSON.parse(producto);
    } else {
      // history.back();
      this.router.navigate(['/cbd/admin/productos/listar']);
    }
  }

  putProductos() {
    this.submitted = true;
    if (this.productosObject.nombreProducto &&
      this.productosObject.preDescripcionProducto &&
      this.productosObject.descripcionProducto &&
      this.imagenPreview) {
      this.almacenarFoto().then(
        (url) => {
          this.productosObject.portadaProducto = url;
          if (this.productosObject.portadaProducto != null) {
            this.productosServices.putProductos(this.productosObject, Number(this.productosObject.idProducto)).subscribe(
              (data) => {
                if (data != null) {
                  Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'Producto Actualizado Exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#ffff',
                    iconColor: '#4CAF50',
                    padding: '1.25rem',
                    width: '20rem',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });

                  // this.router.navigate(['/cbd/admin/productos/listar']);
                  history.back();
                }
              }
            )
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

  editarFoto() {
    this.editFoto = true;
  }

  salir() {
    localStorage.removeItem('productoAdm');
    history.back();
    // this.router.navigate(['/cbd/admin/usuarios/listar']);
  }
}