import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { CcannabisComponent } from './paginas/ccannabis/ccannabis.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';
import { LoginComponent } from './paginas/login/login.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
