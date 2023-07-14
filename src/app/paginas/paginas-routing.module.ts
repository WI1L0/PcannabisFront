import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CcannabisComponent } from './ccannabis/ccannabis.component';
import { LoginComponent } from './login/login.component';
import { DetalleNoticiasComponent } from './detalle-noticias/detalle-noticias.component'; 
import { AllNoticiasComponent } from './all-noticias/all-noticias.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'cannabis', component: CcannabisComponent},
  { path: 'all-noticias', component: AllNoticiasComponent},
  { path: 'detalle-noticias', component: DetalleNoticiasComponent},
  { path: 'login', component: LoginComponent},
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
