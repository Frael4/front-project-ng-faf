import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Modulos */
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // modulo forms
import { MaterialCModule } from './material.c/material-c/material-c.module';

/* Servicios */
import { AuthService } from './service/auth.service';

/* Componentes */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CabeceraComponent } from './utils/cabecera/cabecera.component';
import { FooterComponent } from './utils/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ArbitroComponent } from './components/menus/arbitro/arbitro.component';
import { ActasPartidoComponent } from './components/menus/actas-partido/actas-partido.component';
import { PrincipalComponent } from './components/menus/principal/principal.component';
import { FormActaComponent } from './components/menus/actas-partido/form-acta/form-acta.component';
import { TableActaComponent } from './components/menus/actas-partido/table-acta/table-acta.component';
import { CardMenuComponent } from './utils/card-menu/card-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CabeceraComponent,
    FooterComponent,
    HomeComponent,
    ArbitroComponent,
    ActasPartidoComponent,
    PrincipalComponent,
    FormActaComponent,
    TableActaComponent,
    CardMenuComponent,
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
