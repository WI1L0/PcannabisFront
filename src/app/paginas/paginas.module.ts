import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CcannabisComponent } from './ccannabis/ccannabis.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { LoginComponent } from './login/login.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleNoticiaComponent } from '../detallenoticia/detallenoticia.component';



@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent,
    CcannabisComponent,
    NoticiasComponent,
    LoginComponent,
    DetalleNoticiaComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    NgxPaginationModule
  ]
})
export class PaginasModule { }
