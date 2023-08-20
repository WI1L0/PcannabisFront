import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarEmpresaComponent } from '../super-admin/actualizar-empresa/actualizar-empresa.component';
// import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

const routes: Routes = [
  // { path: 'panel', component: MenuAdminComponent},
  
  { path: 'contactanos', loadChildren: () => import('./contactanos/contactanos.module').then(m => m.ContactanosModule) },
  { path: 'noticias', loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasModule) },
  { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
