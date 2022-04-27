import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

//MANUALES
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { UnirsePartidaComponent } from './components/unirse-partida/unirse-partida.component';
import { PartidaComponent } from './components/partida/partida.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnirsePartidaComponent,
    PartidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Para http (insertar manual)
    ReactiveFormsModule, //Para reactive Forms
    FormsModule //Para NgModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
