import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/modelos/Productos';
import { ProductosResponse } from 'src/app/modelos/Respuestas/ProductosResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SloginService } from 'src/app/services/s-login.service';
import { SproductosService } from 'src/app/services/s-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {

  //PAGINACION
  pagActua: number = 0;
  pagExist: any = 0;
  listProductos: any[] = [];
  respuestaProductos: ProductosResponse = new ProductosResponse();

  // CUERPO DE LA URL IMAGENES
  cuerpoUrlFoto: string = baserUrlImagenes;

  //ESTADOS 
  datoEstado: any = '';

  constructor(
    private AllScripts: AllScriptsService,
    private productosServices: SproductosService,
    private loginServices: SloginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (!this.loginServices.estaLogin()) {
      this.router.navigate(['/cbd/login']);
    }
    this.almacenarEstado('activo');
  }

  // ALMACENAR ESTADO DE VISUALIZACION
  almacenarEstado(estado: string) {
    this.datoEstado = estado;
    this.obtenerProductos();
  }
  // ALMACENAR ESTADO DE VISUALIZACION

  // MOSTRAR PRODUCTOS
  obtenerProductos() {
    this.limpiarAll();
    let TituloOrFecha = (<HTMLInputElement>document.getElementById('busqueda'))
      .value;

    this.productosServices
      .getProductos(this.pagActua, this.datoEstado, nameEmpresa, TituloOrFecha)
      .subscribe(
        (response: ProductosResponse) => {
          this.respuestaProductos = response;
          this.pagExist = response.totalPagina;
          this.listProductos = this.listProductos.concat(
            this.respuestaProductos.contenido
          );
        },
        (error) => {
          console.log('Error al obtener noticias:', error);
        }
      );
  }
  // MOSTRAR PRODUCTOS

  // LIMPIAR LISTAS VARIABLES
  limpiarAll() {
    this.respuestaProductos = {} as ProductosResponse;
    this.listProductos = [];
  }
  // LIMPIAR LISTAS VARIABLES

  // PAGINACION
  nextPagina() {
    if (this.pagActua != this.pagExist) {
      this.pagActua++;
      this.obtenerProductos();
    }
  }

  previoPagina() {
    if (this.pagActua != 0) {
      this.pagActua--;
      this.obtenerProductos();
    }
  }
  // PAGINACION

  // PASAR A DETALLE PRODUCTOS
  setProductosADetalle(producto: Productos) {
    localStorage.removeItem('productoAdm');
    localStorage.setItem('productoAdm', JSON.stringify(producto));
    this.router.navigate(['/cbd/admin/productos/detalle']);
  }
  // PASAR A DETALLE PRODUCTOS

  //PASAR A EDITAR
  setProductosAEditar(producto: Productos) {
    localStorage.removeItem('productoAdm');
    localStorage.setItem('productoAdm', JSON.stringify(producto));
    this.router.navigate(['/cbd/admin/productos/editar']);
  }
  //PASAR A EDITAR

  // ELIMINAR PRODUCTOS
  confirmEliminar(producto: Productos) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      text: 'Se eliminarán todos los registros de este producto de manera permanente y no se podrán recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Para confirmar la eliminación, escriba la siguiente cadena:',
          text: `${producto.idProducto}:${producto.nombreProducto}`,
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: (confirmValue) => {
            if (
              confirmValue === `${producto.idProducto}:${producto.nombreProducto}`
            ) {
              let re = this.productosServices
                .deleteProductos(Number(producto.idProducto))
                .subscribe((resu) => {
                  if (resu != null) {
                    return true;
                  } else {
                    return false;
                  }
                })
              if (re) {
                Swal.fire('Eliminado', 'Producto eliminado', 'success').then(
                  (res) => {
                    this.obtenerProductos();
                  }
                );
              } else {
                Swal.fire('No eliminado', 'Producto no eliminado', 'error');
              }
            } else {
              Swal.showValidationMessage('El valor ingresado no es correcto');
            }
          },
        });
      }
    });
  }
  // ELIMINAR PRODUCTOS

  // OCULTAR Y MOSTRAR PRODUCTOS
  alertOcultarMostrar(
    producto: Productos,
    mensajeTitle: string,
    mensajeText: string,
    mensajeTrue: string,
    mensajeFalse: string
  ) {
    Swal.fire({
      title: '¿Estas seguro de ' + `${mensajeTitle}` + ' este producto?',
      text:
        'Los productos ocultos ' +
        `${mensajeText}` +
        ' ser vistos por el público en general',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ocultar',
    }).then((result) => {
      if (result.isConfirmed) {
        let re = this.productosServices
          .putProductosEstado(Number(producto.idProducto))
          .subscribe((resu) => {
            if (resu != null) {
              return true;
            } else {
              return false;
            }
          })
        if (re) {
          Swal.fire(
            'Producto ' + `${mensajeTrue}` + ' exitosamente',
            'success'
          ).then((res) => {
            this.obtenerProductos();
          });
        } else {
          Swal.fire(' Error al ' + `${mensajeFalse}` + ' producto', 'error');
        }
      }
    });
  }
  // OCULTAR Y MOSTRAR PRODUCTOS
}
