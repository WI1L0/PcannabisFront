import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarEmpresaComponent } from './actualizar-empresa/actualizar-empresa.component';
import { FotosGaleriasComponent } from './fotos-galerias/fotos-galerias.component';

const routes: Routes = [
  { path: 'empresa', component: ActualizarEmpresaComponent},
  { path: 'galeria', component: FotosGaleriasComponent},

  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
