import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { CcannabisComponent } from './paginas/ccannabis/ccannabis.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';
import { LoginComponent } from './paginas/login/login.component';
import { DetalleNoticiasComponent } from './paginas/detalle-noticias/detalle-noticias.component'; 
import { ControlNoticiasComponent } from './paginas/control-noticias/control-noticias.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  }, 
  {
    path: 'n',
    component: NosotrosComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'c',
    component: CcannabisComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'nt',
    component: NoticiasComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'lg',
    component: LoginComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {                                                             
    path: 'dnt',
    component: DetalleNoticiasComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'cnt',
    component: ControlNoticiasComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'admin',
    component: PrincipaladminComponent,
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
