import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Modulos */
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // modulo forms
import { MaterialCModule } from './material.c/material-c/material-c.module';

/* Componentes */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CabeceraComponent } from './utils/cabecera/cabecera.component';
import { FooterComponent } from './utils/footer/footer.component';
/* Servicios */
import { AuthService } from './service/auth.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CabeceraComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialCModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
