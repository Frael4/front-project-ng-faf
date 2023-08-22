import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { ArbitroService } from 'src/app/service/arbitro.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  
  usuarioNuevo: any
  usuario = this.data

  constructor(private router: Router, private dialogRef: MatDialogRef<EditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  , private arbitroService: ArbitroService, public snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.usuarioNuevo = new FormGroup({
      categoria: new FormControl(this.usuario.categoria, Validators.required),
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      apellido: new FormControl(this.usuario.apellido, Validators.required),
      usuario: new FormControl(this.usuario.nombreUsuario),
      contrasenia: new FormControl(this.usuario.contrasenia),
      edad: new FormControl(this.usuario.edad),
      correo: new FormControl(this.usuario.correo),
      nacionalidad: new FormControl(this.usuario.nacionalidad),
      cantPartidos: new FormControl(this.usuario.cantidadPartidos)
    })

  }
  onSubmit() {

    if (this.usuarioNuevo.status === 'VALID') {
      console.log(this.usuarioNuevo.value)
      let obj = {
        id: this.usuario.id,
        categoria: this.usuarioNuevo.value.categoria,
        nombre: this.usuarioNuevo.value.nombre,
        apellido: this.usuarioNuevo.value.apellido,
        nombreUsuario: this.usuarioNuevo.value.usuario,
        contrasenia: this.usuarioNuevo.value.contrasenia,
        edad: this.usuarioNuevo.value.edad,
        email: this.usuarioNuevo.value.correo,
        nacionalidad: this.usuarioNuevo.value.nacionalidad,
        cantidadPartidos: this.usuarioNuevo.value.cantPartidos
      }

      console.log(obj)
      this.arbitroService.saveArbitro(obj).subscribe(
        data => {
          /* if (data.error == 'OK') { */
            this.redirectTo('/home/arbitro')
            this.showSnackBar(data)
            this.dialogRef.close()
          /* } */
        },
        response => {
          console.log(response)
        }
      )
    }
  }

  showSnackBar(data: any) {
    this.snackbar.open(data, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  cancelar() {
    this.dialogRef.close();
  }



}
