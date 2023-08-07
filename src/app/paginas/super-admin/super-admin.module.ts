import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { authInterceptorProviders } from 'src/app/services/defauld/s-interceptor';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { ActualizarEmpresaComponent } from './actualizar-empresa/actualizar-empresa.component';
// import { DfghComponent } from './dfgh/dfgh.component';


@NgModule({
  declarations: [
    ActualizarEmpresaComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
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
export class SuperAdminModule { }
