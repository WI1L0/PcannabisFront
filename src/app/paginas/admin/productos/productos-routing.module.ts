import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { DetalleProductosComponent } from './detalle-productos/detalle-productos.component';

const routes: Routes = [
  { path: 'listar', component: ListarProductosComponent},
  { path: 'crear', component: CrearProductosComponent},
  { path: 'editar', component: EditarProductosComponent},
  { path: 'detalle', component: DetalleProductosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
