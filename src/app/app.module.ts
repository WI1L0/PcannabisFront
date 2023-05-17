import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//implementar js en los componentes
import { AllScriptsService } from './scripts/all-scripts.service';
import { FooterComponent } from './default/footer/footer.component';
import { HeaderComponent } from './default/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    //implementar js en los componentes
    AllScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
