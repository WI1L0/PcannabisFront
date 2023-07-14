import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarEmpresaComponent } from './actualizar-empresa/actualizar-empresa.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';

const routes: Routes = [
  { path: 'panel', component: MenuAdminComponent},
  { path: 'empresa', component: ActualizarEmpresaComponent},
  
  { path: 'contactanos', loadChildren: () => import('./contactanos/contactanos.module').then(m => m.ContactanosModule) },
  { path: 'noticias', loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasModule) },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
