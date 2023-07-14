import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarNoticiasComponent } from './listar-noticias/listar-noticias.component';
import { CrearNoticiasComponent } from './crear-noticias/crear-noticias.component';
import { EditarNoticiasComponent } from './editar-noticias/editar-noticias.component';
import { DetalleNoticiasAdComponent } from './detalle-noticias-ad/detalle-noticias-ad.component';

const routes: Routes = [
  { path: 'listar', component: ListarNoticiasComponent},
  { path: 'crear', component: CrearNoticiasComponent},
  { path: 'editar', component: EditarNoticiasComponent},
  { path: 'detalle', component: DetalleNoticiasAdComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
