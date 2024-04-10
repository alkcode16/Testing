import { NgModule, CUSTOM_ELEMENTS_SCHEMA, forwardRef, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MainComponent } from './modulos/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[
    LoadingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
