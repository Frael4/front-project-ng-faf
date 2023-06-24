import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ArbitroComponent } from './components/menus/arbitro/arbitro.component';
import { ActasPartidoComponent } from './components/menus/actas-partido/actas-partido.component';
import { PrincipalComponent } from './components/menus/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent},
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: PrincipalComponent},
      { path: 'arbitro', component: ArbitroComponent },
      { path: 'actas-partido', component: ActasPartidoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
