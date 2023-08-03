import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarContactanosComponent } from './contactanos/listar-contactanos/listar-contactanos.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { ActualizarEmpresaComponent } from './actualizar-empresa/actualizar-empresa.component';
import { AppComponent } from 'src/app/app.component';
import { authInterceptorProviders } from 'src/app/services/defauld/s-interceptor';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginasRoutingModule } from '../paginas-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { HeaderadminComponent } from '../../default/headeradmin/headeradmin.component';



@NgModule({
  declarations: [
    ActualizarEmpresaComponent,
    MenuAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
export class AdminModule { }
