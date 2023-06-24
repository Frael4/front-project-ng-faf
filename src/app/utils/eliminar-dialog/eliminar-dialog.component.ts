import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css']
})
export class EliminarDialogComponent {

  elemento: any = this.data
  constructor(private router: Router, private dialogRef: MatDialogRef<EliminarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public snackbar: MatSnackBar) { }

  handleDelete() {
    console.log(this.elemento)

    let deleteActa: NavigationExtras = {
      queryParams: {
        data: this.elemento
      },
      skipLocationChange: false,
      fragment: 'top'
    };

    this.redirectTo('/home/actas-partido', deleteActa)
    this.dialogRef.close();
    this.snackbar.open( 'Acta eliminado correctamente', 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    });
  }

  handleCancelar() {
    this.dialogRef.close();
  }

  redirectTo(uri: string, deleteActa: NavigationExtras) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { state: { deleteActa } }));
  }
}
