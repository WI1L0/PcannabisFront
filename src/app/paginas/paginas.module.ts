import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CcannabisComponent } from './ccannabis/ccannabis.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { LoginComponent } from './login/login.component';

import { NgxPaginationModule } from 'ngx-pagination';
// import { DetallenoticiaComponent } from './detallenoticia/detallenoticia.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { AppComponent } from '../app.component';
import { DetalleNoticiasComponent } from './detalle-noticias/detalle-noticias.component';
import { ControlNoticiasComponent } from './control-noticias/control-noticias.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor, authInterceptorProviders } from '../services/defauld/s-interceptor';
// import { authInterceptorProviders } from '../services/defauld/s-interceptor';

@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent,
    CcannabisComponent,
    NoticiasComponent,
    LoginComponent,
    DetalleNoticiasComponent,
    ControlNoticiasComponent,
    // DetallenoticiaComponent,
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
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
