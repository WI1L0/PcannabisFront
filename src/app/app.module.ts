import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//implementar js en los componentes
import { AllScriptsService } from './scripts/all-scripts.service';
import { FooterComponent } from './default/footer/footer.component';
import { HeaderComponent } from './default/header/header.component';


import { NgxPaginationModule } from 'ngx-pagination';

//router
import { RouterModule, Route } from '@angular/router';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
// import { DetallenoticiaComponent } from './paginas/detallenoticia/detallenoticia.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor, authInterceptorProviders } from './services/defauld/s-interceptor';
import { FormsModule } from '@angular/forms';
// import { authInterceptorProviders } from './services/defauld/s-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // DetallenoticiaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
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
export class AppModule { }
