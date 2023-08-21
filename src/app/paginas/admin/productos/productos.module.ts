import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { DetalleProductosComponent } from './detalle-productos/detalle-productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllScriptsService } from 'src/app/scripts/all-scripts.service';
import { authInterceptorProviders } from 'src/app/services/defauld/s-interceptor';
import { AppComponent } from 'src/app/app.component';


@NgModule({
  declarations: [
    CrearProductosComponent,
    EditarProductosComponent,
    ListarProductosComponent,
    DetalleProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
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
export class ProductosModule { }
