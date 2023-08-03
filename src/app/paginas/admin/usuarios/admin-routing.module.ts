import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

const routes: Routes = [
  { path: 'listar', component: ListarUsuariosComponent},
  { path: 'editarus/:id', component: EditarUsuarioComponent},
  { path: 'crear', component: CrearUsuarioComponent},
  { path: 'detalle', component: DetalleUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
