import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { DetalleProductosComponent } from './detalle-productos/detalle-productos.component';


@NgModule({
  declarations: [
    CrearProductosComponent,
    EditarProductosComponent,
    ListarProductosComponent,
    DetalleProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
