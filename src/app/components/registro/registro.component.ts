import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  hidePassword: boolean = true;
  hideConfPassword: boolean = true;

  userRegister = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confPassword: new FormControl('', Validators.required),
    rol: new FormControl(''),
  })

  constructor(private router: Router, private userService: UserService, public snackbar: MatSnackBar) { }


  handleRegistro() {
    this.userService.createUser({
      usuario: this.userRegister.value.usuario,
      contrasenia: this.userRegister.value.confPassword
    }).subscribe(
      data => {
        this.showSnackbar(data)
        if(data.error == 'OK' || data.error == ''){
          this.router.navigate(['login'])
          this.resetearForm()
        }
      },
      response => {
        console.log(response.error)
      }
    )
  }

  get passwordInput() { return this.userRegister.get('password'); }
  get passwordConfInput() { return this.userRegister.get('confPassword'); }
  get verificarPassword() {
    return (this.userRegister.get('password')?.value !== this.userRegister.get('confPassword')?.value
      && this.userRegister.get('confPassword')?.value !== ''
    )
  }


  resetearForm() {
    this.userRegister = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confPassword: new FormControl('', Validators.required),
      rol: new FormControl(''),
    })
  }

  showSnackbar(data: any) {
    this.snackbar.open(data.response, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
