import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';


export interface Datos {
  cedula: string,
  nombre: string,
  apellido: string,
  fechanac: string,
  direccion: string,
  telefono: string,
  correo: string
  
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  usuarioNuevo: any
  usuario = this.data
  constructor(private router: Router, private dialogRef: MatDialogRef<EditarComponent>, @Inject(MAT_DIALOG_DATA) public data: Datos) { }

  ngOnInit(): void {
    this.usuarioNuevo = new FormGroup({
      cedula: new FormControl(this.usuario?.cedula, Validators.required),
      nombre: new FormControl(this.usuario?.nombre, Validators.required),
      apellido: new FormControl(this.usuario?.apellido, Validators.required),
      fechanac: new FormControl(this.usuario?.fechanac, Validators.required),
      direccion: new FormControl(this.usuario?.direccion, Validators.required),
      telefono: new FormControl(this.usuario?.telefono, Validators.required),
      correo: new FormControl(this.usuario?.correo, Validators.required)
    })

  }
  onSubmit() {

    if (this.usuarioNuevo.value.nombre == '' || this.usuarioNuevo.value.apellido == '') {
      return;
    }

    //console.log(this.usuarioNuevo.value)
    let objToSend: NavigationExtras = {
      queryParams: {
        cedula: this.usuarioNuevo.value.cedula,
        nombre: this.usuarioNuevo.value.nombre,
        apellido: this.usuarioNuevo.value.apellido,
        fechanac: this.usuarioNuevo.value.fechanac,
        direccion: this.usuarioNuevo.value.direccion,
        telefono: this.usuarioNuevo.value.telefono,
        correo: this.usuarioNuevo.value.correo
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.redirectTo('/home', objToSend);
    this.dialogRef.close();
  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { state: { editUser: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }



}
