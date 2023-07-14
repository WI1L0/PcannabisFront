import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarContactanosComponent } from './listar-contactanos/listar-contactanos.component';
import { DetalleContactanosComponent } from './detalle-contactanos/detalle-contactanos.component';

const routes: Routes = [
  { path: 'listar', component: ListarContactanosComponent},
  { path: 'detalle', component: DetalleContactanosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactanosRoutingModule { }
