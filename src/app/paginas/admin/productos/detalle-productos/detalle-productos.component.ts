import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/modelos/Productos';
import baserUrlImagenes from 'src/app/services/defauld/helperImagenes';
import { SloginService } from 'src/app/services/s-login.service';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.scss']
})
export class DetalleProductosComponent implements OnInit {

  productosObject: Productos = new Productos();
  cuerpoUrlFoto: string = baserUrlImagenes;


  constructor(
    private router: Router,
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

  salir() {
    localStorage.removeItem('productoAdm');
    history.back();
    // this.router.navigate(['/cbd/admin/usuarios/listar']);
  }

}