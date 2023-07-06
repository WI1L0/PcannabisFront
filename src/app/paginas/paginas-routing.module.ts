import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CcannabisComponent } from './ccannabis/ccannabis.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { LoginComponent } from './login/login.component';
import { DetalleNoticiasComponent } from './detalle-noticias/detalle-noticias.component'; 
import { ControlNoticiasComponent } from './control-noticias/control-noticias.component'; 
import { PrincipaladminComponent } from '../principaladmin/principaladmin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, 
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'conoce_cannabis',
    component: CcannabisComponent
  }, 
  {
    path: 'noticias_Pharma_cannabis',
    component: NoticiasComponent
  }, 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'detallenoticia',
    component: DetalleNoticiasComponent
  },
  {
    path: 'controlnoticia',
    component: ControlNoticiasComponent
  },
  {
    path: 'principal',
    component: PrincipaladminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
