import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleContactanosComponent } from './detalle-contactanos/detalle-contactanos.component';
import { ListarContactanosComponent } from './listar-contactanos/listar-contactanos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { authInterceptorProviders } from 'src/app/services/defauld/s-interceptor';
import { AppComponent } from 'src/app/app.component';
import { ContactanosRoutingModule } from './contactanos-routing.module';



@NgModule({
  declarations: [
    DetalleContactanosComponent, 
    ListarContactanosComponent,
  ],
  imports: [
    CommonModule,
    ContactanosRoutingModule,
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
export class ContactanosModule { }
