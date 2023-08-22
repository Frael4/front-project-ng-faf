import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActaPartidoService } from 'src/app/service/acta-partido.service';
import { AgendaService } from 'src/app/service/agenda.service';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css']
})
export class EliminarDialogComponent {

  id = this.data.element.id
  datos = this.data
  constructor(private router: Router, private dialogRef: MatDialogRef<EliminarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public snackbar: MatSnackBar
    , private actaService: ActaPartidoService,
    private equipoService: EquipoService,
    private agendaService: AgendaService
  ) { }

  handleDelete() {
    console.log(this.datos?.from)
    console.log(this.id)

    if (this.datos?.from == undefined) {
      console.log("No especificado origen")
      return
    }

    switch (this.datos.from) {
      case "equipo":
        this.equipoService.deleteEquipo(this.id).subscribe(
          data => {
            console.log(data)
            if (data.error == 'OK') {
              this.dialogRef.close();
              this.redirectTo('/home/club')
            }
            this.showSnackBar(data)
          },
          response => { }
        )
        break;

      case "acta":
        this.actaService.deleteActaPartido(this.id).subscribe(
          data => {
            console.log(data)
            if (data.error == 'OK') {
              this.dialogRef.close();
              this.redirectTo('/home/actas-partido')
            }
            this.showSnackBar(data)
          },
          response => { }
        )
        break;
      case "agenda":
        this.agendaService.deleteAgenda(this.id).subscribe(
          data => {
            console.log(data)
            if (data.error == 'OK') {
              this.dialogRef.close();
              this.redirectTo('/home/agenda-partido')
            }
            this.showSnackBar(data)
          },
          response => { }
        )
        break;
    }

  }

  handleCancelar() {
    this.dialogRef.close();
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  showSnackBar(data: any) {
    this.snackbar.open(data.response, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    });
  }
}
