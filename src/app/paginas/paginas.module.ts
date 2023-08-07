import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CcannabisComponent } from './ccannabis/ccannabis.component';
import { LoginComponent } from './login/login.component';

import { NgxPaginationModule } from 'ngx-pagination';
// import { DetallenoticiaComponent } from './detallenoticia/detallenoticia.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { AppComponent } from '../app.component';
import { DetalleNoticiasComponent } from './detalle-noticias/detalle-noticias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor, authInterceptorProviders } from '../services/defauld/s-interceptor';
import { AllNoticiasComponent } from './all-noticias/all-noticias.component';
// import { EditarUsuarioComponent } from './admin/usuarios/editar-usuario/editar-usuario.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { EditarUsuarioComponent } from './super-admin/usuarios/editar-usuario/editar-usuario.component';
// import { authInterceptorProviders } from '../services/defauld/s-interceptor';

@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent,
    CcannabisComponent,
    AllNoticiasComponent,
    LoginComponent,
    DetalleNoticiasComponent,
    MenuAdminComponent,
    // DetallenoticiaComponent,
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    //implementar js en los componentes
    AllScriptsService,
    authInterceptorProviders
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class PaginasModule { }
