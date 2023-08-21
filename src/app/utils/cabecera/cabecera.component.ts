import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

  public isDarkTheme: boolean = false

  constructor(private router: Router, public auth: AuthService, public app: AppComponent){
  }
  

  /*  */
  logOut(){
    this.router.navigate(['/'])
  }
}
