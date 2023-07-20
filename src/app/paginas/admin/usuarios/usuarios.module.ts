import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { UsuariosRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { authInterceptorProviders } from 'src/app/services/defauld/s-interceptor';
import { AppComponent } from 'src/app/app.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarNoticiasComponent } from '../noticias/editar-noticias/editar-noticias.component';




@NgModule({
  declarations: [
    ListarUsuariosComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
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
export class UsuariosModule { }
