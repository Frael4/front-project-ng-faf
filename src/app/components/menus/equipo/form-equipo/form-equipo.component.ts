import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router'
import { ActaPartidoService } from 'src/app/service/acta-partido.service';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-form-equipo',
  templateUrl: './form-equipo.component.html',
  styleUrls: ['./form-equipo.component.css']
})
export class FormEquipoComponent {

  title: string = ''
  equipo: any;
  editar = false

  equipos!: any;

  constructor(private router: Router, private dialogRef: MatDialogRef<FormEquipoComponent>, @Inject(MAT_DIALOG_DATA) private editData: any,
    public snackbar: MatSnackBar, private equipoService: EquipoService) { }

  equipoEdit = this.editData

  ngOnInit() {
    //console.log(this.equipoEdit)
    if (this.equipoEdit !== null) {
      this.editar = true
      this.title = 'Editar Equipo'
    } else {
      this.editar = false
      this.title = 'Registrar Equipo'
    }

    this.equipo = new FormGroup({
      id: new FormControl(this.equipoEdit?.id || 0),
      nombreEquipo: new FormControl(this.equipoEdit?.nombre || '', Validators.required),
      director: new FormControl(this.equipoEdit?.director || ''),
    });


  }

  /**
   * Guardar Equipo
   */
  saveEquipo() {

    if (this.equipo.status === 'VALID') {
      console.log(this.equipo.value)

      let obj = {
        nombre: this.equipo.value.nombreEquipo,
        director: this.equipo.value.director
      }

      console.log(obj)
      this.equipoService.saveEquipo(obj).subscribe(
        data => {
          console.log(data.response)
          if (data.error == 'OK') {
            this.redirectTo('/home/club')
            this.showSnackBar(data)
            this.dialogRef.close()
          }

        },
        response => {
          console.log(response)
          this.showSnackBar(response)
        }
      )

    }
  }

  editEquipo() {

    let obj = {
      id: this.equipoEdit.id,
      nombre: this.equipo.value.nombreEquipo,
      director: this.equipo.value.director
    }

    console.log(obj)
    this.equipoService.updateEquipo(obj).subscribe(
      data => {
        console.log(data)
        if (data.error == 'OK') {
          this.dialogRef.close()
          this.editar = false
          this.redirectTo('/home/club')
        }
        this.showSnackBar(data)
      },
      response => {
        console.log(response)
        this.showSnackBar(response)
      }
    )

  }

  showSnackBar(data: any) {
    this.snackbar.open(data.response, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
