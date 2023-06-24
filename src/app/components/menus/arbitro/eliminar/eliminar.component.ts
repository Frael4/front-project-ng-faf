import { Component, Inject, OnInit } from '@angular/core';
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
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  eliminado = this.data;
  nav: any

  constructor(private router: Router, private dialogRef: MatDialogRef<EliminarComponent>, @Inject(MAT_DIALOG_DATA) public data: Datos) {
    /* this.nav = this.router.getCurrentNavigation(); */
  }

  ngOnInit(): void {

  }

  /* Envia dato a eliminar  a home  */
  eliminarElemento() {

    if (this.eliminado !== null) {
      let objToSend: NavigationExtras = {
        queryParams: {
          usuario: this.eliminado
        },
        skipLocationChange: false,
        fragment: 'top'
      };
      this.redirectTo('/home/arbitro', objToSend);
      this.dialogRef.close();

      this.dialogRef.close(true);
    }

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { state: { deleteUser: objToSend } }));
  }
  onCancelar() {
    this.dialogRef.close(false);

  }

}
