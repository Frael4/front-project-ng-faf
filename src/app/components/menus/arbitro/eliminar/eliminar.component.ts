import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArbitroService } from 'src/app/service/arbitro.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  eliminado = this.data;
  nav: any

  constructor(private router: Router, private dialogRef: MatDialogRef<EliminarComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private arbitroService: ArbitroService,
    public snackbar: MatSnackBar) {
    /* this.nav = this.router.getCurrentNavigation(); */
  }

  /* Envia dato a eliminar  a home  */
  eliminarElemento() {
    const id = this.eliminado.id

    //console.log(this.eliminado)
    this.arbitroService.deleteArbitro(id).subscribe(
      e => {
        console.log(e)
      },
      r => {
        console.log(r)
      }
    )

  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  onCancelar() {
    this.dialogRef.close(false);

  }

  showSnackBar(data: any) {
    this.snackbar.open(data, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    });
  }

}
