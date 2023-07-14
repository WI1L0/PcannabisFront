import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearNoticiasComponent } from './crear-noticias/crear-noticias.component';
import { EditarNoticiasComponent } from './editar-noticias/editar-noticias.component';
import { ListarNoticiasComponent } from './listar-noticias/listar-noticias.component';
import { NoticiasRoutingModule } from './Noticias-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { authInterceptorProviders } from 'src/app/services/defauld/s-interceptor';
import { AppComponent } from 'src/app/app.component';
import { DetalleNoticiasAdComponent } from './detalle-noticias-ad/detalle-noticias-ad.component';



@NgModule({
  declarations: [
    CrearNoticiasComponent,
    EditarNoticiasComponent,
    ListarNoticiasComponent,
    DetalleNoticiasAdComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    //implementar js en los componentes
    AllScriptsService,
    authInterceptorProviders
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class NoticiasModule { }
