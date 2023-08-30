import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/modelos/Productos';
import { ProductosResponse } from 'src/app/modelos/Respuestas/ProductosResponse';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { nameEmpresa } from 'src/app/services/defauld/EmpresaName';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SfotosService } from 'src/app/services/s-fotos.service';
import { SloginService } from 'src/app/services/s-login.service';
import { SproductosService } from 'src/app/services/s-productos.service';

@Component({
  selector: 'app-all-productos',
  templateUrl: './all-productos.component.html',
  styleUrls: ['./all-productos.component.scss']
})
export class AllProductosComponent implements OnInit {

  pagActua: number = 0;
  pagExist: any = 0;
  respuestaProductos: ProductosResponse = new ProductosResponse;
  listProductos: any[] = [];
productoObject: Productos = new Productos();


visibleDetalle: Boolean = false;

  cuerpoUrlFoto: string = baserUrlImagenes;

  openModal: boolean = false;

  constructor(
    private AllScripts: AllScriptsService, 
    private productosServices: SproductosService, 
    private loginServices: SloginService, 
    private fotoServices: SfotosService
    ){
    AllScripts.Cargar(["paginas/productos"]);
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.listProductos = [];
    this.productosServices.getProductos(this.pagActua, "activo", nameEmpresa, '').subscribe(
      (response: ProductosResponse) => {
        this.respuestaProductos = response;
        this.pagExist = response.totalPagina;
        this.listProductos = this.listProductos.concat(this.respuestaProductos.contenido);
      },
      error => {
        console.log('Error al obtener productos:', error);
      }
    );
  }

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

  showModal(produ: Productos){
    if(this.openModal == false){
      this.openModal = true;
    } else {
    this.openModal = false;
    }
    
    this.productoObject = new Productos();
    this.productoObject = produ;
  }
}
