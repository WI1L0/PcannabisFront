import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//implementar js en los componentes
import { AllScriptsService } from './scripts/all-scripts.service';
import { FooterComponent } from './default/footer/footer.component';
import { HeaderComponent } from './default/header/header.component';

//router
import { RouterModule, Route } from '@angular/router';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { DetalleNoticiaComponent } from './detallenoticia/detallenoticia.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent, DetalleNoticiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    //implementar js en los componentes
    AllScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
